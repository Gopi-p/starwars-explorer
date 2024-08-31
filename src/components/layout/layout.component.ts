//CORE
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

const CORE = [RouterOutlet];
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [...CORE],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
