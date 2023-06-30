import { Component, OnInit } from '@angular/core';
import { Category, Record, User } from '../shared/models/model';
import { UserService } from '../shared/services/user.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CATEGORY_EXPENSES } from '../shared/constants/categories.const';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [DialogService]
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = CATEGORY_EXPENSES;
  categoriesCopy: Category[] = [];
  records: Record[] = [];
  showDialog: boolean = false;
  isNew: boolean = false;
  category: any = {type: '', name: ''};
  searchText: string = '';

  constructor(
    private userService: UserService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.userService.getUser();
    this.userService.user$.subscribe(data => {
      this.records = data.records;
      this.categoriesCopy.push(...data.categories);
      this.categories.push(...data.categories);
    })
  }

  onSubmit(): void {
    let { name, type, _id } = this.category;

    if (!name || !type) {
      return;
    }

    name = name.trim();

    return this.isNew ? this.addNewCategory({name, type}): this.updateCategory({name, type, _id});
  }

  addNewCategory(category: Category): void {
    this.userService.addCategory(category).subscribe(data => {
      this.showDialog = false;
      this.userService.getUser();
    })
  }

  updateCategory(category: Category): void {
    console.log(category)
    this.updateCategoryInRecords(category);
    this.userService.updateCategory(category).subscribe(data => {
      this.showDialog = false;
      this.userService.getUser();
    })
  }

  updateCategoryInRecords(category: Category): void {
    const recordsToUpdate: Record[] = this.records.filter(r => r.categoryId === category._id)
    const records = recordsToUpdate.map(record => {
      const {categoryId, description, amount, balance, createdOn, isDeleted} = record;
      return {
        categoryName: category.name,
        categoryType: category.type,
        categoryId,
        description,
        amount,
        balance,
        createdOn,
        isDeleted
      }
    })
    
    records.forEach(record => {
      this.userService.updateRecord(record).subscribe(data => {
        this.userService.getUser();
      })
    })
  }

  showAddDialog(): void {
    this.showDialog = true;
    this.isNew = true;
    this.category = {type: '', name: ''};
  }

  showUpdateDialog(item: Category): void {
    this.showDialog = true;
    this.isNew = false;
    this.category = {...item};
  }

  performSearch(query: any): void {
    if (query.length === 0) {
      this.categories = this.categoriesCopy;
    } else {
      this.categories = this.categoriesCopy.filter(item => {
        return (
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.type.toLowerCase().includes(query.toLowerCase())
        );
      });
    }
  }

  close(): void {
    this.showDialog = false;
  }

}
