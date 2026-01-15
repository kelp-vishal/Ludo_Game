
import { Component, OnInit, signal,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPiece } from '../interfaces/ludoboard.interfaces';
import { IGameState } from '../interfaces/ludoboard.interfaces';
import { GameService } from '../services/game.service';

let gameState = {
  currentTurn: 'RED',
  diceValue: 0,
  movablePieces: [],
  pieces: {
    RED_0: { position: -1 },
    RED_1: { position: -1 },
    RED_2: { position: -1 },
    RED_3: { position: -1 },
    YELLOW_0: { position: -1 },
    YELLOW_1: { position: -1 },
    YELLOW_2: { position: -1 },
    YELLOW_3: { position: -1 },
    GREEN_0: { position: -1 },
    GREEN_1: { position: -1 },
    GREEN_2: { position: -1 },
    GREEN_3: { position: -1 },
    BLUE_0: { position: -1 },
    BLUE_1: { position: -1 },
    BLUE_2: { position: -1 },
    BLUE_3: { position: -1 }
  }
};

@Component({
  selector: 'app-ludo-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ludo-board.component.html',
  styleUrls: ['./ludo-board.component.css']
})
export class LudoBoardComponent implements OnInit{
  

  Math = Math;
  turnOrder = ['RED', 'YELLOW', 'GREEN', 'BLUE'];
  valueDice = signal(1);

  pieces: IPiece[] = [];
  gameState: IGameState | null = null;
  // movablePieces: string[] = [];
  //15x15=225
  gridCells = Array(225).fill(0);

  // constructor(public gameService: GameService) { }

  gameService = inject(GameService);

  pieces$ = this.gameService.pieces$;

  ngOnInit() {

    this.gameService.initPieces();
    // Subscribe to gameState changes
    this.gameService.gameState$.subscribe(state => {
      this.gameState = state;
      this.triggerAnimations();
    });
  }

  triggerAnimations() {
    // Animate movable pieces
    if(!this.gameState) return;
    this.gameState.movablePieces.forEach(pieceId => {
      const piece = this.gameService.pieces.find(p => p.id === pieceId);
      if (piece) {
        // Example: Add animation class, or move piece gradually
        console.log(`Animate piece ${piece.id} at position ${piece.position}`);
        // e.g., this.animatePiece(piece);
      }
    });
  }

  rollDice() {
    if (!this.gameState?.gameWon) {
      this.gameService.rollDice();
    }
  }

  selectPiece(pieceId: string) {
    if (this.gameService.movePiece(pieceId)) {
      // Piece moved successfully
    }
  }

  getVisiblePieces() {
    return this.gameService.getVisiblePieces();
  }

  getCurrentPlayer() {
    return this.gameService.getCurrentPlayer();

  }

  isGameWon() {
    return this.gameService.gameState.gameWon;

  }

  // initPieces() {
  //   this.pieces = [
  //     { id: 'RED_0', color: 'red', position: -1, currentX: 40, currentY: 400 },
  //     // {id: 'RED_0', color:'red', position: -1, currentX: 40, currentY: 240},
  //     { id: 'RED_1', color: 'red', position: -1, currentX: 40, currentY: 520 },
  //     { id: 'RED_2', color: 'red', position: -1, currentX: 160, currentY: 400 },
  //     { id: 'RED_3', color: 'red', position: -1, currentX: 160, currentY: 520 },

  //     { id: 'YELLOW_0', color: 'yellow', position: -1, currentX: 400, currentY: 400 },
  //     { id: 'YELLOW_1', color: 'yellow', position: -1, currentX: 520, currentY: 400 },
  //     { id: 'YELLOW_2', color: 'yellow', position: -1, currentX: 400, currentY: 520 },
  //     { id: 'YELLOW_3', color: 'yellow', position: -1, currentX: 520, currentY: 520 },

  //     // GREEN top-right
  //     { id: 'GREEN_0', color: 'green', position: -1, currentX: 400, currentY: 40 },
  //     { id: 'GREEN_1', color: 'green', position: -1, currentX: 400, currentY: 160 },
  //     { id: 'GREEN_2', color: 'green', position: -1, currentX: 520, currentY: 40 },
  //     { id: 'GREEN_3', color: 'green', position: -1, currentX: 520, currentY: 160 },

  //     // BLUE top-left
  //     { id: 'BLUE_0', color: 'blue', position: -1, currentX: 40, currentY: 40 },
  //     { id: 'BLUE_1', color: 'blue', position: -1, currentX: 40, currentY: 160 },
  //     { id: 'BLUE_2', color: 'blue', position: -1, currentX: 160, currentY: 40 },
  //     { id: 'BLUE_3', color: 'blue', position: -1, currentX: 160, currentY: 160 }

  //   ];
  // }

  // rollDice() {
  //   const diceValue = Math.floor(Math.random() * 6) + 1;
  //   this.valueDice.set(diceValue);
  // }

  // updateAllPieces(serverPieces: { [key: string]: { position: number } }) {
  //   this.pieces.forEach(piece => {
  //     const serverPos = serverPieces[piece.id]?.position;
  //     if (serverPos !== undefined) {
  //       piece.position = serverPos;
  //       this.updatePiecePosition(piece.id, serverPos);
  //     }
  //   });
  // }

  // getPathMap(color: string): { row: number; col: number }[] {
  //   switch (color) {
  //     case 'red': return this.PathArrayRED;
  //     case 'green': return this.PathArrayGREEN;
  //     case 'blue': return this.PathArrayBLUE;
  //     case 'yellow': return this.PathArrayYELLOW;
  //     default: return [];
  //   }
  // }


  // updatePiecePosition(pieceId: string, position: number) {
  //   const piece = this.pieces.find(p => p.id === pieceId);
  //   if (!piece) return;

  //   const path = this.getPathMap(piece.color);
  //   if (path[position]) {
  //     const { row, col } = path[position];
  //     piece.currentX = (col - 1) * 40;
  //     piece.currentY = (row - 1) * 40;
  //   }
  // }

  // delay(ms: number) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }

  // async selectPiece(pieceId: string) {
  //   const piece = this.pieces.find(p => p.id === pieceId);
  //   if (!piece) return;

  //   const path = this.getPathMap(piece.color);
  //   if (!path.length) return;
  //   if (piece.position === -1) {
  //     piece.position = 0;
  //     this.updatePiecePosition(piece.id, piece.position);
  //     return;
  //   }
  //   const newPos = piece.position + this.valueDice();
  //   if (newPos >= path.length) return;
  //   // piece.position = newPos;

  //   let start = piece.position;

  //   for (let step = start; step < newPos; step++) {
  //     piece.position += 1;
  //     this.updatePiecePosition(piece.id, piece.position);
  //     await this.delay(350); // adjust speed here
  //   }
  //   // this.updatePiecePosition(piece.id, newPos);
  // }


  isRedHome(index: number): boolean {
    const row = Math.floor(index / 15);
    const col = index % 15;
    return row >= 9 && row <= 15 && (col <= 5) && (col >= 0);
  }
  isYellowHome(index: number): boolean {
    const row = Math.floor(index / 15);
    const col = index % 15;
    return row >= 9 && row <= 14 && col >= 9;
  }

  isGreenHome(index: number): boolean {
    const row = Math.floor(index / 15);
    const col = index % 15;
    return row >= 0 && row <= 5 && col >= 9;
  }

  isBlueHome(index: number): boolean {
    const row = Math.floor(index / 15);
    const col = index % 15;
    return row >= 0 && row <= 5 && col <= 5;
  }
  isSafeZone(index: number): boolean {
    const safeIndices = [122, 188, 36, 102, 201, 133, 23, 91];
    return safeIndices.includes(index);
  }

  // isStartZone(index: number): boolean {
  //   const startIndices = [201, 23, 91, 133];
  //   return startIndices.includes(index);
  // }
  isFinishZone(index: number): boolean {
    const finishIndices = [96, 97, 98, 111, 113, 112, 128, 127, 126];
    return finishIndices.includes(index);
  }

  isRedPath(index: number): boolean {
    const val = [201, 202, 187, 172, 157, 142];
    return val.includes(index);
  }
  isYellowPath(index: number): boolean {
    const val = [133, 118, 117, 116, 115, 114];
    return val.includes(index);
  }
  isGreenPath(index: number): boolean {
    const val = [23, 22, 37, 52, 67, 82];
    return val.includes(index);
  }
  isBluePath(index: number): boolean {
    const val = [91, 106, 107, 108, 109, 110];
    return val.includes(index);
  }

  PathArrayRED = [
    { row: 14, col: 7 },
    { row: 13, col: 7 }, { row: 12, col: 7 }, { row: 11, col: 7 }, { row: 10, col: 7 }, { row: 9, col: 6 }, { row: 9, col: 5 }, { row: 9, col: 4 }, { row: 9, col: 3 }, { row: 9, col: 2 }, { row: 9, col: 1 }, { row: 8, col: 1 }, { row: 7, col: 1 }, { row: 7, col: 2 },
    { row: 7, col: 3 }, { row: 7, col: 4 }, { row: 7, col: 5 }, { row: 7, col: 6 }, { row: 6, col: 7 }, { row: 5, col: 7 }, { row: 4, col: 7 }, { row: 3, col: 7 }, { row: 2, col: 7 }, { row: 1, col: 7 },
    { row: 1, col: 8 }, { row: 1, col: 9 }, { row: 2, col: 9 }, { row: 3, col: 9 }, { row: 4, col: 9 }, { row: 5, col: 9 }, { row: 6, col: 9 }, { row: 7, col: 10 },
    { row: 7, col: 11 }, { row: 7, col: 12 }, { row: 7, col: 13 }, { row: 7, col: 14 }, { row: 7, col: 15 }, { row: 8, col: 15 }, { row: 9, col: 15 },

    { row: 9, col: 14 }, { row: 9, col: 13 }, { row: 9, col: 12 }, { row: 9, col: 11 }, { row: 9, col: 10 }, { row: 10, col: 9 }, { row: 11, col: 9 }, { row: 12, col: 9 }, { row: 13, col: 9 }, { row: 14, col: 9 }, { row: 15, col: 9 }, { row: 15, col: 8 },
    { row: 14, col: 8 }, { row: 13, col: 8 }, { row: 12, col: 8 }, { row: 11, col: 8 }, { row: 10, col: 8 }, { row: 9, col: 8 }
  ];

  PathArrayGREEN = [
    { row: 2, col: 9 }, { row: 3, col: 9 }, { row: 4, col: 9 }, { row: 5, col: 9 }, { row: 6, col: 9 }, { row: 7, col: 10 },
    { row: 7, col: 11 }, { row: 7, col: 12 }, { row: 7, col: 13 }, { row: 7, col: 14 }, { row: 7, col: 15 }, { row: 8, col: 15 }, { row: 9, col: 15 },

    { row: 9, col: 14 }, { row: 9, col: 13 }, { row: 9, col: 12 }, { row: 9, col: 11 }, { row: 9, col: 10 }, { row: 10, col: 9 }, { row: 11, col: 9 }, { row: 12, col: 9 }, { row: 13, col: 9 }, { row: 14, col: 9 }, { row: 15, col: 9 }, { row: 15, col: 8 },
    { row: 14, col: 7 },
    { row: 13, col: 7 }, { row: 12, col: 7 }, { row: 11, col: 7 }, { row: 10, col: 7 }, { row: 9, col: 6 }, { row: 9, col: 5 }, { row: 9, col: 4 }, { row: 9, col: 3 }, { row: 9, col: 2 }, { row: 9, col: 1 }, { row: 8, col: 1 },
    { row: 8, col: 1 }, { row: 7, col: 1 }, { row: 7, col: 2 },
    { row: 7, col: 3 }, { row: 7, col: 4 }, { row: 7, col: 5 }, { row: 7, col: 6 }, { row: 6, col: 7 }, { row: 5, col: 7 }, { row: 4, col: 7 }, { row: 3, col: 7 }, { row: 2, col: 7 }, { row: 1, col: 7 },
    { row: 1, col: 8 }, { row: 2, col: 8 }, { row: 3, col: 8 }, { row: 4, col: 8 }, { row: 5, col: 8 }, { row: 6, col: 8 }, { row: 7, col: 8 },
  ];

  PathArrayBLUE = [
    { row: 7, col: 2 },
    { row: 7, col: 3 }, { row: 7, col: 4 }, { row: 7, col: 5 }, { row: 7, col: 6 }, { row: 6, col: 7 }, { row: 5, col: 7 }, { row: 4, col: 7 }, { row: 3, col: 7 }, { row: 2, col: 7 }, { row: 1, col: 7 },
    { row: 1, col: 8 }, { row: 1, col: 9 }, { row: 2, col: 9 }, { row: 3, col: 9 }, { row: 4, col: 9 }, { row: 5, col: 9 }, { row: 6, col: 9 }, { row: 7, col: 10 },
    { row: 7, col: 11 }, { row: 7, col: 12 }, { row: 7, col: 13 }, { row: 7, col: 14 }, { row: 7, col: 15 }, { row: 8, col: 15 }, { row: 9, col: 15 },

    { row: 9, col: 14 }, { row: 9, col: 13 }, { row: 9, col: 12 }, { row: 9, col: 11 }, { row: 9, col: 10 }, { row: 10, col: 9 }, { row: 11, col: 9 }, { row: 12, col: 9 }, { row: 13, col: 9 }, { row: 14, col: 9 }, { row: 15, col: 9 }, { row: 15, col: 8 },
    { row: 14, col: 7 },
    { row: 13, col: 7 }, { row: 12, col: 7 }, { row: 11, col: 7 }, { row: 10, col: 7 }, { row: 9, col: 6 }, { row: 9, col: 5 }, { row: 9, col: 4 }, { row: 9, col: 3 }, { row: 9, col: 2 }, { row: 9, col: 1 }, { row: 8, col: 1 },
    { row: 8, col: 2 }, { row: 8, col: 3 }, { row: 8, col: 4 }, { row: 8, col: 5 }, { row: 8, col: 6 }, { row: 8, col: 7 }
  ];
  PathArrayYELLOW = [
    { row: 9, col: 14 }, { row: 9, col: 13 }, { row: 9, col: 12 }, { row: 9, col: 11 }, { row: 9, col: 10 }, { row: 10, col: 9 }, { row: 11, col: 9 }, { row: 12, col: 9 }, { row: 13, col: 9 }, { row: 14, col: 9 }, { row: 15, col: 9 }, { row: 15, col: 8 }, { row: 15, col: 7 },
    { row: 14, col: 7 },
    { row: 13, col: 7 }, { row: 12, col: 7 }, { row: 11, col: 7 }, { row: 10, col: 7 }, { row: 9, col: 6 }, { row: 9, col: 5 }, { row: 9, col: 4 }, { row: 9, col: 3 }, { row: 9, col: 2 }, { row: 9, col: 1 }, { row: 8, col: 1 }, { row: 7, col: 1 }, { row: 7, col: 2 },
    { row: 7, col: 3 }, { row: 7, col: 4 }, { row: 7, col: 5 }, { row: 7, col: 6 }, { row: 6, col: 7 }, { row: 5, col: 7 }, { row: 4, col: 7 }, { row: 3, col: 7 }, { row: 2, col: 7 }, { row: 1, col: 7 },
    { row: 1, col: 8 }, { row: 1, col: 9 }, { row: 2, col: 9 }, { row: 3, col: 9 }, { row: 4, col: 9 }, { row: 5, col: 9 }, { row: 6, col: 9 }, { row: 7, col: 10 },
    { row: 7, col: 11 }, { row: 7, col: 12 }, { row: 7, col: 13 }, { row: 7, col: 14 }, { row: 7, col: 15 }, { row: 8, col: 15 },
    { row: 8, col: 14 }, { row: 8, col: 13 }, { row: 8, col: 12 }, { row: 8, col: 11 }, { row: 8, col: 10 }, { row: 8, col: 9 }
  ];

}
