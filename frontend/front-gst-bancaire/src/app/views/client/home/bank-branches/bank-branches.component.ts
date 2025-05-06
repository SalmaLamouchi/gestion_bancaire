// // import { Component, OnInit } from '@angular/core';
// // import { LocationService } from 'src/app/services/location.service';
// // import { Location } from 'src/app/models/location';

// // @Component({
// //   selector: 'app-bank-branches',
// //   templateUrl: './bank-branches.component.html',
// //   styleUrls: ['./bank-branches.component.css']
// // })
// // export class BankBranchesComponent implements OnInit {
// //   locations: Location[] = [];
// //   filteredLocations: Location[] = [];
// //   paginatedLocations: Location[] = [];
// //   types: string[] = ['bank', 'mall', 'hospital']; // Ajoute ici les types que tu souhaites
// //   selectedType: string = '';  // Valeur du type sélectionné
// //  // Pagination
// //  currentPage: number = 1;
// //  itemsPerPage: number = 5;
// //  totalPages: number = 0;

// //   constructor(private locationService: LocationService) {}

// //   ngOnInit(): void {
// //     this.locationService.getAllLocations().subscribe(data => {
// //       this.locations = data;
// //       this.filteredLocations = data;
// //       this.updatePagination();
// //     });
// //   }

// //   onTypeChange(): void {
// //     if (this.selectedType === '') {
// //       this.filteredLocations = this.locations;
// //     } else {
// //       this.filteredLocations = this.locations.filter(location => location.type === this.selectedType);
// //     }
// //   }updatePagination(): void {
// //     this.totalPages = Math.ceil(this.filteredLocations.length / this.itemsPerPage);
// //     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
// //     const endIndex = startIndex + this.itemsPerPage;
// //     this.paginatedLocations = this.filteredLocations.slice(startIndex, endIndex);
// //   }

// //   goToPage(page: number): void {
// //     this.currentPage = page;
// //     this.updatePagination();
// //   }

// //   nextPage(): void {
// //     if (this.currentPage < this.totalPages) {
// //       this.currentPage++;
// //       this.updatePagination();
// //     }
// //   }

// //   previousPage(): void {
// //     if (this.currentPage > 1) {
// //       this.currentPage--;
// //       this.updatePagination();
// //     }
// //   }
// // }


// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { LocationService } from 'src/app/services/location.service';
// import { Location } from 'src/app/models/location';
// import * as mapboxgl from 'mapbox-gl';

// @Component({
//   selector: 'app-bank-branches',
//   templateUrl: './bank-branches.component.html',
//   styleUrls: ['./bank-branches.component.css']
// })
// export class BankBranchesComponent implements OnInit, OnDestroy {
//   // Données existantes
//   locations: Location[] = [];
//   filteredLocations: Location[] = [];
//   paginatedLocations: Location[] = [];
//   types: string[] = ['bank', 'mall', 'hospital'];
//   selectedType: string = '';

//   // Pagination
//   currentPage: number = 1;
//   itemsPerPage: number = 5;
//   totalPages: number = 0;

//   // Mapbox
//   map!: mapboxgl.Map;
//   markers: mapboxgl.Marker[] = [];

//   constructor(private locationService: LocationService) {
//     (mapboxgl as any).accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN'; // Remplacez par votre token
//   }

//   ngOnInit(): void {
//     this.locationService.getAllLocations().subscribe(data => {
//       this.locations = data;
//       this.filteredLocations = data;
//       this.updatePagination();
//       this.initMap();
//       this.addMarkersToMap(this.filteredLocations);
//     });
//   }

//   ngOnDestroy(): void {
//     if (this.map) this.map.remove();
//   }

//   // Initialisation de la carte
//   initMap(): void {
//     this.map = new mapboxgl.Map({
//       container: 'map', // ID de l'élément HTML
//       style: 'mapbox://styles/mapbox/streets-v11', // Style de la carte
//       center: [2.3522, 48.8566], // Paris par défaut (lng, lat)
//       zoom: 12
//     });

//     // Optionnel : Ajoute des contrôles de navigation
//     this.map.addControl(new mapboxgl.NavigationControl());
//   }

//   // Ajoute des marqueurs sur la carte
//   addMarkersToMap(locations: Location[]): void {
//     // Supprime les anciens marqueurs
//     this.markers.forEach(marker => marker.remove());
//     this.markers = [];

//     // Ajoute les nouveaux marqueurs
//     locations.forEach(location => {
//       const popup = new mapboxgl.Popup()
//         .setHTML(`
//           <h5>${location.name}</h5>
//           <p>${location.type} | ${location.city}</p>
//           <small>${location.address}</small>
//         `);

//       const marker = new mapboxgl.Marker({ color: this.getMarkerColor(location.type) })
//         .setLngLat([location.longitude, location.latitude])
//         .setPopup(popup)
//         .addTo(this.map);

//       this.markers.push(marker);
//     });

//     // Ajuste la vue de la carte pour afficher tous les marqueurs
//     if (locations.length > 0) {
//       const bounds = new mapboxgl.LngLatBounds();
//       locations.forEach(loc => bounds.extend([loc.longitude, loc.latitude]));
//       this.map.fitBounds(bounds, { padding: 50 });
//     }
//   }

//   // Couleur des marqueurs selon le type
//   getMarkerColor(type: string): string {
//     switch (type) {
//       case 'bank': return '#3a86ff';
//       case 'mall': return '#ff006e';
//       case 'hospital': return '#06d6a0';
//       default: return '#8338ec';
//     }
//   }

//   // Filtrage des localisations
//   onTypeChange(): void {
//     if (this.selectedType === '') {
//       this.filteredLocations = this.locations;
//     } else {
//       this.filteredLocations = this.locations.filter(location => location.type === this.selectedType);
//     }
//     this.currentPage = 1;
//     this.updatePagination();
//     this.addMarkersToMap(this.filteredLocations); // Met à jour la carte
//   }

//   // Pagination (méthodes existantes)
//   updatePagination(): void {
//     this.totalPages = Math.ceil(this.filteredLocations.length / this.itemsPerPage);
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     const endIndex = startIndex + this.itemsPerPage;
//     this.paginatedLocations = this.filteredLocations.slice(startIndex, endIndex);
//   }

//   goToPage(page: number): void {
//     this.currentPage = page;
//     this.updatePagination();
//   }

//   nextPage(): void {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;
//       this.updatePagination();
//     }
//   }

//   previousPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       this.updatePagination();
//     }
//   }
// }



import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { Location } from 'src/app/models/location';
import * as L from 'leaflet';

@Component({
  selector: 'app-bank-branches',
  templateUrl: './bank-branches.component.html',
  styleUrls: ['./bank-branches.component.css']
})
export class BankBranchesComponent implements OnInit, OnDestroy {
  locations: Location[] = [];
  filteredLocations: Location[] = [];
  paginatedLocations: Location[] = [];
  types: string[] = ['bank', 'mall', 'hospital'];
  selectedType: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  map!: L.Map;
  markers: L.Marker[] = [];

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe(data => {
      this.locations = data;
      this.filteredLocations = data;
      this.updatePagination();
      this.initMap();
      this.addMarkers(this.filteredLocations);
    });
  }

  ngOnDestroy(): void {
    if (this.map) this.map.remove();
  }
  ngAfterViewInit() {
    this.initMap();
  }
  initMap(): void {
    // Créer la carte seulement si le conteneur existe
    if (!this.map && document.getElementById('map')) {
      this.map = L.map('map', {
        preferCanvas: true, // Solution pour certaines cartes tronquées
        zoomControl: true
      }).setView([36.8, 10.18], 15);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(this.map);
  
      // Forcer le recalcul après un léger délai
      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize({ pan: false });
        }
      }, 300);
    }
  }

  addMarkers(locations: Location[]): void {
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.markers = [];

    if (locations.length === 0) return;

    const bounds = L.latLngBounds([]);

    locations.forEach(location => {
      const marker = L.marker([location.latitude, location.longitude], {
        icon: L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41]
        })
      })
      .bindPopup(`<strong>${location.name}</strong><br>${location.type}<br>${location.city}`)
      .addTo(this.map);

      this.markers.push(marker);
      bounds.extend(marker.getLatLng());
    });

    this.map.fitBounds(bounds, { padding: [50, 50] });
  }

  onTypeChange(): void {
    this.filteredLocations = this.selectedType
      ? this.locations.filter(loc => loc.type === this.selectedType)
      : this.locations;

    this.currentPage = 1;
    this.updatePagination();
    this.addMarkers(this.filteredLocations);
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredLocations.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedLocations = this.filteredLocations.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
