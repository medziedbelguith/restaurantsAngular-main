import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
//import { UserService } from '../../../services/user/user.service';
import { Router, Event } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

 
  @Input() isOpenModalDelete = false

  @Input() isLoading = false

  @Input() idDeleteModal
  
  @Input() params1Delete

  @Input() params2Delete

  classCss = "modalDelete"
  
  @Output() deleteItem = new EventEmitter<string>();

  @Output() closeModalDelete = new EventEmitter<string>();

  constructor( private router:Router,  private http: HttpClient){ 
   
  }

  delete() {
    this.deleteItem.emit();
  }

  closeDelete(){
    this.closeModalDelete.emit();
  }
  
  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalDelete){
      this.classCss = "modalDelete modalDelete-open"
    }else{
      this.classCss = "modalDelete"
    }
  }

}