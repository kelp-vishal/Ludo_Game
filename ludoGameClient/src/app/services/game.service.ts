import { Injectable } from '@angular/core';
import { IGameState,IPiece } from '../interfaces/ludoboard.interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GameService {

  gameState: IGameState = {
    activePlayers: [],
    currentTurn: 0,
    diceValue: 0,
    pieces: {},
    gameWon: null,
    movablePieces: []
  };
  private piecesSubject = new BehaviorSubject<IPiece[]>([]);
  pieces$ = this.piecesSubject.asObservable();

  private gameStateSubject = new BehaviorSubject<IGameState>(this.gameState);
  gameState$ = this.gameStateSubject.asObservable();
  pieces: IPiece[] = [];
  initPieces() {
    //for active player use loop for each color and push to pieces array

    
    // this.gameState.activePlayers.forEach(player =>  {
    //   // const color = this.gameState.activePlayers[activePlayer];
    //   if(player.includes('RED')) {
    //     this.pieces.push(
    //       { id: 'RED_0', color: 'red', position: -1, currentX: 40, currentY: 400 },
    //       // {id: 'RED_0', color:'red', position: -1, currentX: 40, currentY: 240},
    //       { id: 'RED_1', color: 'red', position: -1, currentX: 40, currentY: 520 },
    //       { id: 'RED_2', color: 'red', position: -1, currentX: 160, currentY: 400 },
    //       { id: 'RED_3', color: 'red', position: -1, currentX: 160, currentY: 520 });
    //   }
    //   else if(player.includes('YELLOW')) {
    //       this.pieces.push(
    //         { id: 'YELLOW_0', color: 'yellow', position: -1, currentX: 400, currentY: 400 },
    //         { id: 'YELLOW_1', color: 'yellow', position: -1, currentX: 520, currentY: 400 },
    //         { id: 'YELLOW_2', color: 'yellow', position: -1, currentX: 400, currentY: 520 },
    //         { id: 'YELLOW_3', color: 'yellow', position: -1, currentX: 520, currentY: 520 },
    //       )
    //   }
    //   else if(player.includes('GREEN')) {
    //       this.pieces.push(
    //         { id: 'GREEN_0', color: 'green', position: -1, currentX: 400, currentY: 40 },
    //       { id: 'GREEN_1', color: 'green', position: -1, currentX: 400, currentY: 160 },
    //       { id: 'GREEN_2', color: 'green', position: -1, currentX: 520, currentY: 40 },
    //       { id: 'GREEN_3', color: 'green', position: -1, currentX: 520, currentY: 160 },
    //       )
    //   }
    //   else if(player.includes('BLUE')) {
    //       this.pieces.push(
    //         { id: 'BLUE_0', color: 'blue', position: -1, currentX: 40, currentY: 40 },
    //         { id: 'BLUE_1', color: 'blue', position: -1, currentX: 40, currentY: 160 },
    //         { id: 'BLUE_2', color: 'blue', position: -1, currentX: 160, currentY: 40 },
    //         { id: 'BLUE_3', color: 'blue', position: -1, currentX: 160, currentY: 160 }
    //       )
    //   }
    // });

    this.piecesSubject.next([
      { id: 'RED_0', color: 'red', position: -1, currentX: 40, currentY: 400 },
      // {id: 'RED_0', color:'red', position: -1, currentX: 40, currentY: 240},
      { id: 'RED_1', color: 'red', position: -1, currentX: 40, currentY: 520 },
      { id: 'RED_2', color: 'red', position: -1, currentX: 160, currentY: 400 },
      { id: 'RED_3', color: 'red', position: -1, currentX: 160, currentY: 520 },

      { id: 'YELLOW_0', color: 'yellow', position: -1, currentX: 400, currentY: 400 },
      { id: 'YELLOW_1', color: 'yellow', position: -1, currentX: 520, currentY: 400 },
      { id: 'YELLOW_2', color: 'yellow', position: -1, currentX: 400, currentY: 520 },
      { id: 'YELLOW_3', color: 'yellow', position: -1, currentX: 520, currentY: 520 },

      // GREEN top-right
      { id: 'GREEN_0', color: 'green', position: -1, currentX: 400, currentY: 40 },
      { id: 'GREEN_1', color: 'green', position: -1, currentX: 400, currentY: 160 },
      { id: 'GREEN_2', color: 'green', position: -1, currentX: 520, currentY: 40 },
      { id: 'GREEN_3', color: 'green', position: -1, currentX: 520, currentY: 160 },

      // BLUE top-left
      { id: 'BLUE_0', color: 'blue', position: -1, currentX: 40, currentY: 40 },
      { id: 'BLUE_1', color: 'blue', position: -1, currentX: 40, currentY: 160 },
      { id: 'BLUE_2', color: 'blue', position: -1, currentX: 160, currentY: 40 },
      { id: 'BLUE_3', color: 'blue', position: -1, currentX: 160, currentY: 160 }

    ]);
  }

  // pieces: IPiece[] = [];
  constructor() {
    this.initPieces();
  }

  startGame(playerCount: number) {
    const configs = [
      { color: 'RED', active: playerCount >= 2 },
      { color: 'GREEN', active: playerCount >= 2 },
      { color: 'BLUE', active: playerCount >= 3 },
      { color: 'YELLOW', active: playerCount === 4 }
    ];

    console.log('Starting game with players:', configs.filter(p => p.active).map(p => p.color));

    this.gameState.activePlayers = configs.filter(p => p.active).map(p => p.color);

    this.initPieces();

    this.gameState.currentTurn = 0;
    this.gameState.diceValue = 0;
    this.gameState.gameWon = null;
    this.gameState.movablePieces = [];

    // Initialize all pieces
    // Object.keys(this.gameState.pieces).forEach(pieceId => {
      
    //   const color = pieceId.split('_')[0];
    //   this.gameState.pieces[pieceId] = this.gameState.activePlayers.includes(color) ? -1 : -999;
    // });
    console.log('Initial game state:', this.gameState);

    // now update piece positions
    // this.initPieces();

    console.log('Initialized pieces:', this.pieces);

  }

  rollDice(): number {
    this.gameState.diceValue = Math.floor(Math.random() * 6) + 1;
    const currentPlayer = this.gameState.activePlayers[this.gameState.currentTurn];
    this.gameState.movablePieces = this.calculateMovablePieces(currentPlayer, this.gameState.diceValue);

    this.gameStateSubject.next({ ...this.gameState });
    console.log('Rolled dice:', this.gameState.diceValue, 'Movable pieces for', currentPlayer, ':', this.gameState.movablePieces);
    return this.gameState.diceValue;
  }

  private calculateMovablePieces(color: string, dice: number): string[] {
    const movable: string[] = [];
    ['_0', '_1', '_2', '_3'].forEach(suffix => {
      const pieceId = `${ color }${ suffix }`;
      const pos = this.gameState.pieces[pieceId];
      if (pos === -999) return; // Hidden
      if (pos === -1 && dice === 6) movable.push(pieceId);
      else if (pos >= 0 && (pos + dice) <= 57) movable.push(pieceId);
    });
    return movable;
  }

  movePiece(pieceId: string): boolean {
    const color = pieceId.split('_')[0];
    const currentPlayer = this.gameState.activePlayers[this.gameState.currentTurn];

    if (currentPlayer !== color || !this.gameState.movablePieces.includes(pieceId)) {
      return false; // Invalid move
    }

    const oldPos = this.gameState.pieces[pieceId];
    const newPos = oldPos === -1 ? 0 : oldPos + this.gameState.diceValue;
    this.gameState.pieces[pieceId] = newPos;

    // Collision check
    this.checkCollisions(pieceId, newPos);
    // Next turn (6 = extra turn)
    if (this.gameState.diceValue !== 6) {
      this.gameState.currentTurn = (this.gameState.currentTurn + 1) % this.gameState.activePlayers.length;
    }

    this.gameState.movablePieces = [];
    this.checkWin();
    // this.updatePiecePositions();
    this.syncUiPieces();
    return true;
  }

  private checkCollisions(movingPieceId: string, newPos: number) {
    Object.keys(this.gameState.pieces).forEach(pieceId => {
      if (pieceId !== movingPieceId && this.gameState.pieces[pieceId] === newPos) {
        const opponentColor = pieceId.split('_')[0];
        if (this.gameState.activePlayers.includes(opponentColor)) {
          this.gameState.pieces[pieceId] = -1;
        }
      }
    });
  }

  private checkWin() {
    this.gameState.activePlayers.forEach(color => {
      const allWon = ['_0', '_1', '_2', '_3'].every(
        suffix =>
        this.gameState.pieces[`${ color }${ suffix }`] >= 58
      );
      if (allWon) this.gameState.gameWon = color;
    });
  }

  // private updatePiecePositions() {
  //   this.pieces.forEach(piece => {
  //     piece.position = this.gameState.pieces[piece.id];
  //     const value = this.gameState.pieces[piece.id];
  //     // Update currentX/Y based on pathMap

  //     if(value === -1) {
  //       // Home position logic
  //       if(piece.id.startsWith('RED')) {
  //         piece.currentX = piece.id.endsWith('_0') ? 20 : piece.id.endsWith('_1') ? 60 : piece.id.endsWith('_2') ? 20 : 60;
  //         piece.currentY = 560;
  //       }
  //     piece.currentX = (piece.position - 1) * 40;
  //     piece.currentY = (piece.position - 1) * 40;
  //   });

  //   console.log('Updated piece positions:', this.pieces);
  // }

  getPathMap(color: string): { row: number; col: number }[] {
    switch (color) {
      case 'red': return this.PathArrayRED;
      case 'green': return this.PathArrayGREEN;
      case 'blue': return this.PathArrayBLUE;
      case 'yellow': return this.PathArrayYELLOW;
      default: return [];
    }
  }

  updatePiecePosition(pieceId: string, position: number) {
    const piece = this.pieces.find(p => p.id === pieceId);
    if (!piece) return;

    const path = this.getPathMap(piece.color);
    if (path[position]) {
      const { row, col } = path[position];
      piece.currentX = (col - 1) * 40;
      piece.currentY = (row - 1) * 40;
    }
  }

  getVisiblePieces(): IPiece[] {
    return this.pieces.filter(p => this.gameState.pieces[p.id] !== -999);
  }

  getCurrentPlayer(): string {
    return this.gameState.activePlayers[this.gameState.currentTurn] || '';
  }

  private syncUiPieces() {
    const updated = this.piecesSubject.value.map(p => ({
      ...p,
      position: this.gameState.pieces[p.id]
    }));

    this.piecesSubject.next(updated);
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




