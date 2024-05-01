import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterModule} from "@angular/router";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit{
  constructor(private route: ActivatedRoute) {  }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'));
  }

}
