import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  locations = [];
  pageNumber: number = 1;

  constructor(private api: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.api.getAllLocations()
      .subscribe((res: any) =>{
        console.log(res);
        this.locations = res.Locations;
      })
  }

  addToFavorites(data){
    console.log(data);

    this.api.addFavorite(data.name, data.address, data.phone, data.type, localStorage.getItem('userId'), data._id)
      .subscribe((res: any) =>{
        if(res.success === true){
          this.toastr.success('Added to Favorites');
        }
        else{
          this.toastr.error('Location Already a Favorite');
        }
      });
  }

}
