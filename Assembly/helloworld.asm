global  _main
     extern  _printf
     section .text
_main:
     push    message
     call    _printf
     add     esp, 4
     ret
message:
     db      'Hello, World', 10, 0
     bootStart:
       jmp             _start
       nop
       bootDrive       db      'MSDOS6.0'
       bps                     dw      512
       spc                     db      8
       rs                      dw      1
       fats            db      2
       re                      dw      512
       ss                      dw      0
       media           db      0xf8
       spfat           dw      0xc900
       spt                     dw      0x3f00
       heads           dw      0x1000
       hidden          dw      0x3f00, 0
       ls                      dw      0x5142,0x0600
       pdn                     db      0x80
       cheads                  db      0
       sig                     db      0x29
       serialno        dw      0xce13, 0x4630
       label           db      'NO NAME'
       fattype         db      "FAT32"
       mov     ax, 0x07c0
       mov     ds, ax
