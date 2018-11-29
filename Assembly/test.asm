bits 16

org 0                                   ; BIOS will load the MBR to this location.

bootStart:
  jmp  _start
  nop
  bootDrive db 'MSDOS6.0'
  bps dw 512
  spc db 8
  rs dw 1
  fats db 2
  re dw 512
  ss dw 0
  media db 0xf8
  spfat dw 0xc900
  spt dw 0x3f00
  heads dw 0x1000
  hidden dw 0x3f00, 0
  ls dw 0x5142,0x0600
  pdn db 0x80
  cheads db 0
  sig db 0x29
  serialno dw 0xce13, 0x4630
  label db 'NO NAME'
  fattype db"FAT32"

_start:                                                        ; set up the registers
  mov ax, 07C0h
  add ax, 288
  mov ss, ax
  mov sp, 4096

  mov ax, 07C0h
  mov ds, ax

  MOV SI, HelloString
  CALL PrintString
  JMP $

PrintCharacter:
  MOV AH, 0x0E
  MOV BH, 0x00
  MOV BL, 0x

  INT 0x10
RET

PrintString:
  next_character:
    MOV Al, [SI]
    INC SI
    OR AL, AL
    JZ exit_function
    CALL PrintCharacter
    JMP next_character
    exit_function:
  RET
  HelloString db 'Hello Caleb, This is Shrey and Welcome to my bootloader', 0

  times 510 - ($ -$$) db 0
dw 0AA55h
