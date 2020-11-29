import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  currentUrl: string;

  constructor(private router : Router, private route: ActivatedRoute) { 
    this.router.events.subscribe((_: NavigationEnd) => this.currentUrl = this.router.url);
  }

  ngOnInit(): void {
  }

  navigateLocations(){
    this.router.navigate(['/locations']);
  }

  navigateSearch(){
    this.router.navigate(['/search']);
  }

  navigateFavourites(){
    this.router.navigate(['/favorites']);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
