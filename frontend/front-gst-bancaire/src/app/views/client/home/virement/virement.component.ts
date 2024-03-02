// virement.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TransService } from 'src/app/services/trans.service';

@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit {
  virementForm!: FormGroup;
  message!: string;

  constructor(private formBuilder: FormBuilder, private router: Router,private transService: TransService) {}

  ngOnInit(): void {
    this.virementForm = this.formBuilder.group({
      compteSourceId: [''],
      compteDestinationId: [''],
      montant: ['']
    });
  }

  effectuerVirement() {
    const { compteSourceId, compteDestinationId, montant } = this.virementForm.value;
    this.transService.effectuerVirement(compteSourceId, compteDestinationId, montant)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'Virement effectué avec succès!';
          // Réinitialiser le formulaire après un virement réussi
          this.virementForm.reset();
          this.router.navigate(['/services']);
        },
        error => {
          console.error(error);
          this.message = 'Erreur lors de l\'exécution du virement';
        }
      );
  }
}
