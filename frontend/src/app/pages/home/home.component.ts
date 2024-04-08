import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BulletinBoardPostsService } from 'src/app/services/bulletin-board-posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: any[] = [];
  title = new FormControl('');
  description = new FormControl('');
  department = new FormControl('');
  hasError = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private auth: AuthService,
    private bulletinBoardPostsService: BulletinBoardPostsService
  ) { }

  ngOnInit(): void {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    this.bulletinBoardPostsService.getPosts().subscribe({
      next: (v) => (this.posts = v as any),
      error: (e) => console.log(e),
    });
  }

  addNewPost(e: Event) {
    e.preventDefault();
    this.hasError = false;

    if (
      !this.title.value ||
      !this.description.value ||
      !this.department.value
    ){
      this.hasError = true;
      this.errorMessage = 'Please fill out all fields';
      return;
    }

    this.bulletinBoardPostsService
    .add(this.title.value, this.description.value, this.department.value)
    .subscribe({
      next: (v) => {
        this.posts.push(v);
        this.title.setValue('');
        this.description.setValue('');
        this.department.setValue('');
        alert("Post has been created");
      },
    });
  }

  deletePost(id: string) {
    console.log('Delete was called');
    this.bulletinBoardPostsService
    .delete(id)
    .subscribe({ next: (v) => console.log(v), error: (e) => console.log(e) });

    const filtered = this.posts.filter((post) => post._id !== id);
    this.posts = filtered;
  }

}