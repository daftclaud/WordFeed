import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
})
export class ThemeToggleComponent implements OnInit {
  isDark: boolean | undefined;
  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    const savedPref = window.localStorage.getItem('prefersDark');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (savedPref === null) {
      this.isDark = prefersDark.matches;
      window.localStorage.setItem('prefersDark', JSON.stringify(this.isDark));
    } else {
      this.isDark = JSON.parse(savedPref);
    }
    this.toggleDark(this.isDark);
  }

  toggleDark(shouldAdd: boolean) {
    this.isDark = shouldAdd;
    this.document.body.classList.toggle('dark', shouldAdd);
    window.localStorage.setItem('prefersDark', JSON.stringify(shouldAdd));
  }

}
