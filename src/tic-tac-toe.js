class TicTacToe {
    constructor() {
        this.currentPlayerSymbol = 'x';
        this.table = [[null, null, null], [null, null, null], [null, null, null]];
        this.turns = 0;

    }

    getCurrentPlayerSymbol() {
        return this.currentPlayerSymbol;
    }

    nextTurn(rowIndex, columnIndex) {
        if(this.table[rowIndex][columnIndex]) return;
        this.table[rowIndex][columnIndex] = this.currentPlayerSymbol;
        this.currentPlayerSymbol = this.currentPlayerSymbol === 'x' ? 'o' : 'x';
        this.turns++

    }

    isFinished() {
        return this.getWinner() || this.isDraw() ? true : false;
    }

    getWinner() {
        let getHorizontalRepeated = (table) => {

            let check = (row) => {
                let o = row.every(value => value === 'o');
                let x = row.every(value => value === 'x');
                return x ? 'x' : o ? 'o' : null ;
            }

            let repeatedCell;

            table.forEach((row) => { if(!repeatedCell) repeatedCell = check(row) });

            return repeatedCell;
        }

        let getVerticalRepeated = (table) => {
        
            let countRepeated = table[0].slice();
            
            table.forEach((row) => { row.forEach((cell, index) => { 
                countRepeated[index] = countRepeated[index] === cell ? cell : null;
                })
            })

            return countRepeated.reduce((sum, cell) => sum = sum ? sum : cell);
        }
        
        let getDiagonalRepeated = (table) => {

            let center = table[1][1],
                a = table[0][0] === center && table[2][2] === center,
                b = table[0][2] === center && table[2][0] === center;
            return (a || b) ? center : null;
        }

        let playerSymbol = getVerticalRepeated(this.table) || getHorizontalRepeated(this.table) || getDiagonalRepeated(this.table);
        
        return playerSymbol

    }

    noMoreTurns() {
        return this.turns === 9;
    }

    isDraw() {
        return this.getWinner() === null && this.turns === 9;
    }

    getFieldValue(rowIndex, colIndex) {
        return this.table[rowIndex][colIndex];
    }

}

module.exports = TicTacToe;
