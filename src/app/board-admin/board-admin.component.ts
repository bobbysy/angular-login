import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss'],
})
export class BoardAdminComponent implements OnInit {
  content = '';

  readonly links = [
    { icon: 'house', link: '/home', name: 'home' },
    { icon: 'dashboard', link: '/admin', name: 'admin' },
    { icon: 'explore', link: 'http://example2.app.com:4300', name: 'Example2' },
    { icon: 'code', link: 'http://example3.test.com:4400', name: 'Example3' },
  ];

  folders = [
    { name: 'Folder 1', link: '/admin#1' },
    { name: 'Folder 2', link: '/admin#2' },
    { name: 'Folder 3', link: '/admin#3' },
    { name: 'Folder 4', link: '/admin#4' },
    { name: 'Folder 5', link: '/admin#5' },
  ];

  cols = 1;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      (data) => {
        // Load content from auth backend
        this.content = data;
      },
      (err) => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
