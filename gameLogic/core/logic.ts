/* =========================

   TYPES & MODELS

========================= */

export type PlayerColor = "RED" | "BLUE" | "GREEN" | "YELLOW";

export type TokenPosition = "YARD" | "HOME" | number;

export interface Player {

  id: string;

  color: PlayerColor;

}

export interface Token {

  id: string;

  playerId: string;

  position: TokenPosition;

}

export interface GameState {

  currentTurn: string;     // playerId

  dice: number | null;

  players: Player[];

  tokens: Token[];

  status: "IN_PROGRESS" | "FINISHED";

  winner?: string;

}

/* =========================

   CONSTANTS (LUDO RULES)

========================= */

const DICE_MIN = 1;

const DICE_MAX = 6;

const FINAL_CELL = 57;

const SAFE_CELLS = [0, 8, 13, 21, 26, 34, 39, 47];

/* =========================

   HELPERS

========================= */

function randomDice(): number {

  return Math.floor(Math.random() * DICE_MAX) + DICE_MIN;

}

function clone<T>(obj: T): T {

  return JSON.parse(JSON.stringify(obj));

}

/* =========================

   CORE GAME FUNCTIONS

========================= */

/* 1️⃣ ROLL DICE */

export function rollDice(state: GameState): GameState {

  if (state.status !== "IN_PROGRESS") return state;

  const newState = clone(state);

  newState.dice = randomDice();

  return newState;

}

/* 2️⃣ GET VALID MOVES */

export function getValidMoves(state: GameState): Token[] {

  if (!state.dice) return [];

  return state.tokens.filter(token => {

    if (token.playerId !== state.currentTurn) return false;

    // Token in yard needs 6

    if (token.position === "YARD") {

      return state.dice === 6;

    }

    // Token already home

    if (token.position === "HOME") return false;

    // Exact move to HOME

    return token.position + state.dice <= FINAL_CELL;

  });

}

/* 3️⃣ MOVE TOKEN */

export function moveToken(state: GameState, tokenId: string): GameState {

  const newState = clone(state);

  const token = newState.tokens.find(t => t.id === tokenId);

  if (!token || newState.dice === null) return state;

  if (token.playerId !== newState.currentTurn) return state;

  // Unlock token

  if (token.position === "YARD") {

    if (newState.dice !== 6) return state;

    token.position = 0;

  }

  // Move token normally

  else if (typeof token.position === "number") {

    const nextPos = token.position + newState.dice;

    if (nextPos > FINAL_CELL) return state;

    token.position = nextPos;

  }

  // Check kill

  handleKill(newState, token);

  // Check win

  if (checkWin(newState, token.playerId)) {

    newState.status = "FINISHED";

    newState.winner = token.playerId;

    return newState;

  }

  // Extra turn on 6

  if (newState.dice !== 6) {

    newState.currentTurn = getNextPlayer(newState);
   
  }

  newState.dice = null;

  return newState;

}

/* =========================

   GAME RULE HELPERS

========================= */

function handleKill(state: GameState, movedToken: Token) {

  if (typeof movedToken.position !== "number") return;

  if (SAFE_CELLS.includes(movedToken.position)) return;

  state.tokens.forEach(token => {

    if (

      token.id !== movedToken.id &&

      token.position === movedToken.position &&

      token.playerId !== movedToken.playerId

    ) {

      token.position = "YARD";

    }

  });

}

function getNextPlayer(state: GameState): string {

  const index = state.players.findIndex(p => p.id === state.currentTurn);

  return state.players[(index + 1) % state.players.length].id;

}

function checkWin(state: GameState, playerId: string): boolean {

  return state.tokens

    .filter(t => t.playerId === playerId)

    .every(t => t.position === FINAL_CELL);

}

/* =========================

   GAME INITIALIZER

========================= */

export function createGame(players: Player[]): GameState {

  const tokens: Token[] = [];

  players.forEach(player => {

    for (let i = 1; i <= 4; i++) {

      tokens.push({

        id: ${player.color}_${i},

        playerId: player.id,

        position: "YARD"

      });

    }

  });

  return {

    currentTurn: players[0].id,

    dice: null,

    players,

    tokens,

    status: "IN_PROGRESS"

  };

}


