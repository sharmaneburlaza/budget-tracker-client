import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { CATEGORY_EXPENSES } from '../shared/constants/categories.const';
import { Category, CategoryType, Record, User } from '../shared/models/model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
  providers: [DialogService]
})
export class RecordsComponent {
  showDialog: boolean = false;
  isNew = false;
  records: Record[] = [];
  recordsOriginalCopy: Record[] = [];
  categories: Category[] = [];
  selectedCategories: Category[] = [];
  record!: Record;
  searchText: string = '';

  constructor(
    private userService: UserService,
    public dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.userService.getUser();
    this.userService.user$.subscribe(data => {
      const records: Record[] = data.records;
      this.recordsOriginalCopy = records.filter(r => r.isDeleted === false);
      this.records = this.getBalance(records).reverse();
      this.categories = data.categories;
    })
  }

  initRecord(): void {
    this.record = {
      categoryName: '',
      categoryType: '',
      description: '',
      amount: 0,
    }
  }

  onCategoryTypeChange(): void {
    let {categoryType: type} = this.record;
    type = type.toLowerCase();

    this.categories.push(...CATEGORY_EXPENSES);

    if (type === 'income') {
      this.selectedCategories = this.categories.filter(c => c.type.toLowerCase() === CategoryType.Income);
    } else if (type === 'expense') {
      this.selectedCategories = this.categories.filter(c => c.type.toLowerCase() === CategoryType.Expense);
    }
  }

  onSubmit(): void {
    let { categoryName, categoryType, description, amount } = this.record;
    if (!(categoryName || categoryName || description || amount)) {
      return;
    }
    description = description.trim();
    const categoryId = this.getCategoryId(categoryName, categoryType);
    console.log(categoryId)
    const record = {
      categoryId,
      categoryName,
      categoryType,
      description,
      amount
    }
    return this.isNew ? this.addNewRecord(record) : this.updateRecord(record);
  }

  getCategoryId(name: string, type: string): string | undefined {
    console.log(this.categories)
    return this.categories.find(c => c.name === name && c.type.toLowerCase() === type.toLowerCase())?._id;
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

      const {categoryName, categoryType, categoryId, createdOn, amount, description} = r;

      return {
        categoryName,
        categoryType,
        categoryId, createdOn,
        amount,
        balance,
        description
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
    this.record = {...item};
  }

  deleteRecord(item: Record): void {

  }

  performSearch(query: any): void {

  }

  close(): void {
    this.showDialog = false;
  }

}
