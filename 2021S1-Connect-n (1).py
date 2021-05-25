# %load connect_n.py

WHITE_DISK = '\u26AA'
BLACK_DISK = '\u26AB'
FW_SPACE = '\u3000' # fullwidth space
FW_LINE = '\u2015' # fullwidth horizontal line

# the game itself
game = { 
    'N' : 4,    
    'board':[], # the connect-n board
    'moves':[] # the moves by players    
}

def create_board(n):
    '''create the board for the Connect-N game'''
    game['N'] = n
    
    # your code should instead create an empty board with N+3 rows and N+2 Columns
    # example code below, creating a board with 4 rows and 3 columns, with some pre-filled disks
    # 0 - empty, 1 - white disk, 2 - black disk
    board = [[0,1,2],[0,0,0], [0,0,0], [0,0,0]]
    game['board'] = board
    
def display_board():
    '''print the board content'''
    
    # Unicode example below. You should update the code below by
    # 1. use a for loop
    # 2. allow it to display board of different sizes
    w = f'{WHITE_DISK:^3}' # white
    b = f'{BLACK_DISK:^3}' # black
    e = f'{FW_SPACE:^3}' # empty
    separator = FW_LINE*20
    
    board = game['board']
    s = ''
    for i in range(game['N']): # you should use nested for loop here
        cell = board[0][i] 
        if cell == 0: 
            s = s + f'| {e}'
        elif cell == 1:
            s = s + f'| {w}'
        elif cell == 2:
            s = s + f'| {b}'
    print(s)
    
def drop_disk(c):
    '''drop disk at column c'''
    print('drop disk at...')
    
def check_winning():
    '''check if there is a winner'''
    print('winner is ...')
    
def save_board(fname):
    '''save the game'''
    # you should save all the information in the game
    print('save_board')
    
def load_board(fname):
    '''load the game'''
    # load the game
    print('load board')

def show_moves():
    '''show all previous moves'''
    # for example, ['W2', 'B2'] means white drops disk column 2 and black drops disk at column 2
    print('show all moves')
    
# EXAMPLE SCEANRIO BELOW
# N = input('Please input the size of your board:')

N = 3 # your code should allow user inputs instead
create_board(N)
drop_disk(2) # white drop disk at column 2
check_winning()
drop_disk(2) # black drop disk at column 2
check_winning()
drop_disk(3) # white drop disk at column 3
check_winning()
drop_disk(3) # black drop disk at column 3
check_winning()
drop_disk(4) # white drop disk at column 4
check_winning() # white wins because she conencts 3 disks
display_board()
