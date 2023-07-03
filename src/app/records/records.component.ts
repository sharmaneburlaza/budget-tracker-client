import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { CATEGORY_EXPENSES, CATEGORY_INCOME } from '../shared/constants/categories.const';
import { Category, CategoryType, Record, User } from '../shared/models/model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
  providers: [DialogService]
})
export class RecordsComponent {
  private unsubscribe$ = new Subject<void>();
  showDialog: boolean = false;
  isNew = false;
  records: Record[] = [];
  recordsOriginalCopy: Record[] = [];
  categories: Category[] = [];
  selectedCategories: Category[] = [];
  recordForm!: FormGroup<any>;
  searchText: string = '';
  dateNow = new Date();

  constructor(
    private userService: UserService,
    public dialogService: DialogService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userService.getUser();
    this.userService.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      const records: Record[] = data.records;
      this.recordsOriginalCopy = records.filter(r => r.isDeleted === false);
      this.records = this.getBalance(records).reverse();
      this.categories = data.categories;
    })
  }

  initRecord(): void {
    this.recordForm = this.fb.group({
      categoryName: ['', [Validators.required]],
      categoryType: ['', [Validators.required]],
      description: ['', [Validators.required]],
      amount: [0, [Validators.required]],
      transactionDate: [new Date(), Validators.required]
    })
  }

  onCategoryTypeChange(): void {
    let {categoryType: type} = this.recordForm.value;
    type = type.toLowerCase();

    this.categories.push(...CATEGORY_INCOME, ...CATEGORY_EXPENSES);

    if (type === 'income') {
      this.selectedCategories = this.categories.filter(c => c.type.toLowerCase() === CategoryType.Income);
    } else if (type === 'expense') {
      this.selectedCategories = this.categories.filter(c => c.type.toLowerCase() === CategoryType.Expense);
    }
  }

  onSubmit(): void {
    let { categoryName, categoryType, description, amount, transactionDate } = this.recordForm.value;
    if (!(categoryName || categoryName || description || amount)) {
      return;
    }
    description = description.trim();
    const categoryId = this.getCategoryId(categoryName, categoryType);
    const date = new Date(transactionDate);
    const record = {
      categoryId,
      categoryName,
      categoryType,
      description,
      amount,
      transactionDate: date
    }
    return this.isNew ? this.addNewRecord(record) : this.updateRecord(record);
  }

  getCategoryId(name: string, type: string): string | undefined {
    const category = this.categories.find(c => c.name === name && c.type.toLowerCase() === type.toLowerCase());
    return category?.defined_id ? `${category.defined_id}` : category?._id;
  }

  getBalance(records: Record[]): Record[] {
    const balances: number[] = [];
    return records.map(r => {
      const type = r.categoryType.toLocaleLowerCase();
      if (type === 'income') {
        balances.push(r.amount)
      } else {
        balances.push(-Math.abs(r.amount))
      }
      const balance = balances.reduce((accumulator, currentValue) => {
        return (accumulator + currentValue)
      }, 0)

      const {categoryName, categoryType, categoryId, amount, description, transactionDate} = r;

      return {
        categoryName,
        categoryType,
        categoryId, 
        amount,
        balance,
        description,
        transactionDate
      }
    })
  }

  addNewRecord(record: Record): void {
    this.userService.addRecord(record).subscribe(data => {
      this.showDialog = false;
      this.userService.getUser();
    })
  }

  updateRecord(record: Record): void {
    this.userService.updateRecord(record).subscribe(data => {
      this.showDialog = false;
      this.userService.getUser();
    })
  }

  showAddDialog(): void {
    this.showDialog = true;
    this.isNew = true;
    this.initRecord();
  }

  showUpdateDialog(item: Record): void {
    this.showDialog = true;
    this.isNew = false;
    this.recordForm.setValue({...item});
  }

  deleteRecord(item: Record): void {

  }

  performSearch(query: any): void {

  }

  close(): void {
    this.showDialog = false;
  }

  ngOnDestroy(): void {
    // Emit a value to trigger the unsubscribe in takeUntil
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
