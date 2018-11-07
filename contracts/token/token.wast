(module
 (type $ii (func (param i32) (result i32)))
 (type $iiI (func (param i32 i32) (result i64)))
 (type $iiv (func (param i32 i32)))
 (type $iii (func (param i32 i32) (result i32)))
 (type $v (func))
 (type $iiiv (func (param i32 i32 i32)))
 (type $iv (func (param i32)))
 (type $iIii (func (param i32 i64 i32) (result i32)))
 (type $Iiv (func (param i64 i32)))
 (type $iI (func (param i32) (result i64)))
 (type $iIIv (func (param i32 i64 i64)))
 (type $iIIi (func (param i32 i64 i64) (result i32)))
 (type $i (func (result i32)))
 (type $iiii (func (param i32 i32 i32) (result i32)))
 (type $iIiv (func (param i32 i64 i32)))
 (type $Iv (func (param i64)))
 (type $iIi (func (param i32 i64) (result i32)))
 (type $iIIIi (func (param i32 i64 i64 i64) (result i32)))
 (type $iiiIIi (func (param i32 i32 i32 i64 i64) (result i32)))
 (type $IIIIi (func (param i64 i64 i64 i64) (result i32)))
 (type $iIv (func (param i32 i64)))
 (type $I (func (result i64)))
 (type $IIIIiii (func (param i64 i64 i64 i64 i32 i32) (result i32)))
 (type $iIiiv (func (param i32 i64 i32 i32)))
 (type $iIiIv (func (param i32 i64 i32 i64)))
 (type $iIIiii (func (param i32 i64 i64 i32 i32) (result i32)))
 (type $iIIiiv (func (param i32 i64 i64 i32 i32)))
 (type $Ii (func (param i64) (result i32)))
 (type $IIIIv (func (param i64 i64 i64 i64)))
 (import "env" "abort" (func $~lib/env/abort))
 (import "env" "ultrainio_assert" (func $~lib/env/ultrainio_assert (param i32 i32)))
 (import "env" "ts_log_print_s" (func $~lib/ultrain-ts-lib/src/log/env.ts_log_print_s (param i32)))
 (import "env" "ts_log_print_i" (func $~lib/ultrain-ts-lib/src/log/env.ts_log_print_i (param i64 i32)))
 (import "env" "ts_log_done" (func $~lib/ultrain-ts-lib/src/log/env.ts_log_done))
 (import "env" "action_data_size" (func $~lib/ultrain-ts-lib/internal/action.d/env.action_data_size (result i32)))
 (import "env" "read_action_data" (func $~lib/ultrain-ts-lib/internal/action.d/env.read_action_data (param i32 i32) (result i32)))
 (import "env" "require_auth" (func $~lib/ultrain-ts-lib/internal/action.d/env.require_auth (param i64)))
 (import "env" "db_find_i64" (func $~lib/env/db_find_i64 (param i64 i64 i64 i64) (result i32)))
 (import "env" "db_get_i64" (func $~lib/env/db_get_i64 (param i32 i32 i32) (result i32)))
 (import "env" "current_receiver" (func $~lib/env/current_receiver (result i64)))
 (import "env" "db_store_i64" (func $~lib/env/db_store_i64 (param i64 i64 i64 i64 i32 i32) (result i32)))
 (import "env" "db_update_i64" (func $~lib/env/db_update_i64 (param i32 i64 i32 i32)))
 (import "env" "send_inline" (func $~lib/ultrain-ts-lib/internal/action.d/env.send_inline (param i32 i32)))
 (import "env" "is_account" (func $~lib/ultrain-ts-lib/internal/action.d/env.is_account (param i64) (result i32)))
 (import "env" "require_recipient" (func $~lib/ultrain-ts-lib/internal/action.d/env.require_recipient (param i64)))
 (import "env" "db_remove_i64" (func $~lib/env/db_remove_i64 (param i32)))
 (global $~lib/internal/allocator/AL_BITS i32 (i32.const 3))
 (global $~lib/internal/allocator/AL_SIZE i32 (i32.const 8))
 (global $~lib/internal/allocator/AL_MASK i32 (i32.const 7))
 (global $~lib/internal/allocator/MAX_SIZE_32 i32 (i32.const 1073741824))
 (global $~lib/allocator/arena/startOffset (mut i32) (i32.const 0))
 (global $~lib/allocator/arena/offset (mut i32) (i32.const 0))
 (global $~lib/ultrain-ts-lib/src/utils/PrintableChar i32 (i32.const 1272))
 (global $~lib/ultrain-ts-lib/src/log/Log (mut i32) (i32.const 0))
 (global $~lib/ultrain-ts-lib/src/asset/CHAR_A i32 (i32.const 65))
 (global $~lib/ultrain-ts-lib/src/asset/CHAR_Z i32 (i32.const 90))
 (global $~lib/internal/arraybuffer/HEADER_SIZE i32 (i32.const 8))
 (global $~lib/internal/arraybuffer/MAX_BLENGTH i32 (i32.const 1073741816))
 (global $~lib/internal/string/HEADER_SIZE i32 (i32.const 4))
 (global $~lib/ultrain-ts-lib/src/asset/SYS (mut i64) (i64.const 0))
 (global $~lib/ultrain-ts-lib/src/asset/SYS_NAME (mut i64) (i64.const 0))
 (global $~lib/ultrain-ts-lib/src/asset/MAX_AMOUNT i64 (i64.const 4611686018427387903))
 (global $contract/token/STATSTABLE i32 (i32.const 1624))
 (global $contract/token/ACCOUNTTABLE i32 (i32.const 1640))
 (global $~lib/datastream/HEADER_SIZE i32 (i32.const 4))
 (global $HEAP_BASE i32 (i32.const 3920))
 (memory $0 1)
 (data (i32.const 8) "\01\00\00\00 \00")
 (data (i32.const 16) "\01\00\00\00!\00")
 (data (i32.const 24) "\01\00\00\00\"\00")
 (data (i32.const 32) "\01\00\00\00#\00")
 (data (i32.const 40) "\01\00\00\00$\00")
 (data (i32.const 48) "\01\00\00\00%\00")
 (data (i32.const 56) "\01\00\00\00&\00")
 (data (i32.const 64) "\01\00\00\00\'\00")
 (data (i32.const 72) "\01\00\00\00(\00")
 (data (i32.const 80) "\01\00\00\00)\00")
 (data (i32.const 88) "\01\00\00\00*\00")
 (data (i32.const 96) "\01\00\00\00+\00")
 (data (i32.const 104) "\01\00\00\00,\00")
 (data (i32.const 112) "\01\00\00\00-\00")
 (data (i32.const 120) "\01\00\00\00.\00")
 (data (i32.const 128) "\01\00\00\00/\00")
 (data (i32.const 136) "\01\00\00\000\00")
 (data (i32.const 144) "\01\00\00\001\00")
 (data (i32.const 152) "\01\00\00\002\00")
 (data (i32.const 160) "\01\00\00\003\00")
 (data (i32.const 168) "\01\00\00\004\00")
 (data (i32.const 176) "\01\00\00\005\00")
 (data (i32.const 184) "\01\00\00\006\00")
 (data (i32.const 192) "\01\00\00\007\00")
 (data (i32.const 200) "\01\00\00\008\00")
 (data (i32.const 208) "\01\00\00\009\00")
 (data (i32.const 216) "\01\00\00\00:\00")
 (data (i32.const 224) "\01\00\00\00;\00")
 (data (i32.const 232) "\01\00\00\00<\00")
 (data (i32.const 240) "\01\00\00\00=\00")
 (data (i32.const 248) "\01\00\00\00>\00")
 (data (i32.const 256) "\01\00\00\00?\00")
 (data (i32.const 264) "\01\00\00\00@\00")
 (data (i32.const 272) "\01\00\00\00A\00")
 (data (i32.const 280) "\01\00\00\00B\00")
 (data (i32.const 288) "\01\00\00\00C\00")
 (data (i32.const 296) "\01\00\00\00D\00")
 (data (i32.const 304) "\01\00\00\00E\00")
 (data (i32.const 312) "\01\00\00\00F\00")
 (data (i32.const 320) "\01\00\00\00G\00")
 (data (i32.const 328) "\01\00\00\00H\00")
 (data (i32.const 336) "\01\00\00\00I\00")
 (data (i32.const 344) "\01\00\00\00J\00")
 (data (i32.const 352) "\01\00\00\00K\00")
 (data (i32.const 360) "\01\00\00\00L\00")
 (data (i32.const 368) "\01\00\00\00M\00")
 (data (i32.const 376) "\01\00\00\00N\00")
 (data (i32.const 384) "\01\00\00\00O\00")
 (data (i32.const 392) "\01\00\00\00P\00")
 (data (i32.const 400) "\01\00\00\00Q\00")
 (data (i32.const 408) "\01\00\00\00R\00")
 (data (i32.const 416) "\01\00\00\00T\00")
 (data (i32.const 424) "\01\00\00\00U\00")
 (data (i32.const 432) "\01\00\00\00V\00")
 (data (i32.const 440) "\01\00\00\00W\00")
 (data (i32.const 448) "\01\00\00\00X\00")
 (data (i32.const 456) "\01\00\00\00Y\00")
 (data (i32.const 464) "\01\00\00\00Z\00")
 (data (i32.const 472) "\01\00\00\00[\00")
 (data (i32.const 480) "\01\00\00\00\\\00")
 (data (i32.const 488) "\01\00\00\00]\00")
 (data (i32.const 496) "\01\00\00\00^\00")
 (data (i32.const 504) "\01\00\00\00_\00")
 (data (i32.const 512) "\01\00\00\00`\00")
 (data (i32.const 520) "\01\00\00\00a\00")
 (data (i32.const 528) "\01\00\00\00b\00")
 (data (i32.const 536) "\01\00\00\00c\00")
 (data (i32.const 544) "\01\00\00\00d\00")
 (data (i32.const 552) "\01\00\00\00e\00")
 (data (i32.const 560) "\01\00\00\00f\00")
 (data (i32.const 568) "\01\00\00\00g\00")
 (data (i32.const 576) "\01\00\00\00h\00")
 (data (i32.const 584) "\01\00\00\00i\00")
 (data (i32.const 592) "\01\00\00\00j\00")
 (data (i32.const 600) "\01\00\00\00k\00")
 (data (i32.const 608) "\01\00\00\00l\00")
 (data (i32.const 616) "\01\00\00\00m\00")
 (data (i32.const 624) "\01\00\00\00n\00")
 (data (i32.const 632) "\01\00\00\00o\00")
 (data (i32.const 640) "\01\00\00\00p\00")
 (data (i32.const 648) "\01\00\00\00q\00")
 (data (i32.const 656) "\01\00\00\00r\00")
 (data (i32.const 664) "\01\00\00\00s\00")
 (data (i32.const 672) "\01\00\00\00t\00")
 (data (i32.const 680) "\01\00\00\00u\00")
 (data (i32.const 688) "\01\00\00\00v\00")
 (data (i32.const 696) "\01\00\00\00w\00")
 (data (i32.const 704) "\01\00\00\00x\00")
 (data (i32.const 712) "\01\00\00\00y\00")
 (data (i32.const 720) "\01\00\00\00z\00")
 (data (i32.const 728) "\01\00\00\00{\00")
 (data (i32.const 736) "\01\00\00\00|\00")
 (data (i32.const 744) "\01\00\00\00}\00")
 (data (i32.const 752) "\01\00\00\00~\00")
 (data (i32.const 760) "|\01\00\00\00\00\00\00\08\00\00\00\10\00\00\00\18\00\00\00 \00\00\00(\00\00\000\00\00\008\00\00\00@\00\00\00H\00\00\00P\00\00\00X\00\00\00`\00\00\00h\00\00\00p\00\00\00x\00\00\00\80\00\00\00\88\00\00\00\90\00\00\00\98\00\00\00\a0\00\00\00\a8\00\00\00\b0\00\00\00\b8\00\00\00\c0\00\00\00\c8\00\00\00\d0\00\00\00\d8\00\00\00\e0\00\00\00\e8\00\00\00\f0\00\00\00\f8\00\00\00\00\01\00\00\08\01\00\00\10\01\00\00\18\01\00\00 \01\00\00(\01\00\000\01\00\008\01\00\00@\01\00\00H\01\00\00P\01\00\00X\01\00\00`\01\00\00h\01\00\00p\01\00\00x\01\00\00\80\01\00\00\88\01\00\00\90\01\00\00\98\01\00\00\98\01\00\00\a0\01\00\00\a8\01\00\00\b0\01\00\00\b8\01\00\00\c0\01\00\00\c8\01\00\00\d0\01\00\00\d8\01\00\00\e0\01\00\00\e8\01\00\00\f0\01\00\00\f8\01\00\00\00\02\00\00\08\02\00\00\10\02\00\00\18\02\00\00 \02\00\00(\02\00\000\02\00\008\02\00\00@\02\00\00H\02\00\00P\02\00\00X\02\00\00`\02\00\00h\02\00\00p\02\00\00x\02\00\00\80\02\00\00\88\02\00\00\90\02\00\00\98\02\00\00\a0\02\00\00\a8\02\00\00\b0\02\00\00\b8\02\00\00\c0\02\00\00\c8\02\00\00\d0\02\00\00\d8\02\00\00\e0\02\00\00\e8\02\00\00\f0\02\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data (i32.const 1272) "\f8\02\00\00_\00\00\00")
 (data (i32.const 1280) "\04\00\00\00U\00G\00A\00S\00")
 (data (i32.const 1296) "+\00\00\00l\00e\00n\00g\00t\00h\00 \00o\00f\00 \00_\00s\00y\00m\00b\00o\00l\00 \00n\00a\00m\00e\00 \00m\00u\00s\00t\00 \00b\00e\00 \00l\00e\00s\00s\00 \00t\00h\00a\00n\00 \007\00.\00")
 (data (i32.const 1392) "\0d\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00.\00t\00s\00")
 (data (i32.const 1424) "\1c\00\00\00~\00l\00i\00b\00/\00i\00n\00t\00e\00r\00n\00a\00l\00/\00a\00r\00r\00a\00y\00b\00u\00f\00f\00e\00r\00.\00t\00s\00")
 (data (i32.const 1488) "\0e\00\00\00~\00l\00i\00b\00/\00s\00t\00r\00i\00n\00g\00.\00t\00s\00")
 (data (i32.const 1520) "0\00\00\00s\00t\00r\00i\00n\00g\00_\00t\00o\00_\00_\00s\00y\00m\00b\00o\00l\00 \00f\00a\00i\00l\00e\00d\00 \00f\00o\00r\00 \00n\00o\00t\00 \00s\00u\00p\00o\00o\00r\00t\00 \00c\00o\00d\00e\00 \00:\00 \00")
 (data (i32.const 1624) "\04\00\00\00s\00t\00a\00t\00")
 (data (i32.const 1640) "\08\00\00\00a\00c\00c\00o\00u\00n\00t\00s\00")
 (data (i32.const 1664) "\1b\00\00\00~\00l\00i\00b\00/\00i\00n\00t\00e\00r\00n\00a\00l\00/\00t\00y\00p\00e\00d\00a\00r\00r\00a\00y\00.\00t\00s\00")
 (data (i32.const 1728) "\"\00\00\00t\00o\00k\00e\00n\00.\00c\00r\00e\00a\00t\00e\00:\00 \00i\00n\00v\00a\00l\00i\00d\00 \00s\00y\00m\00b\00o\00l\00 \00n\00a\00m\00e\00.\00")
 (data (i32.const 1800) "\1d\00\00\00t\00o\00k\00e\00n\00.\00c\00r\00e\00a\00t\00e\00:\00 \00i\00n\00v\00a\00l\00i\00d\00 \00s\00u\00p\00p\00l\00y\00.\00")
 (data (i32.const 1864) "!\00\00\00t\00o\00k\00e\00n\00 \00w\00i\00t\00h\00 \00s\00y\00m\00b\00o\00l\00 \00a\00l\00r\00e\00a\00d\00y\00 \00e\00x\00i\00s\00t\00s\00.\00")
 (data (i32.const 1936) "3\00\00\00c\00a\00n\00 \00n\00o\00t\00 \00c\00r\00e\00a\00t\00e\00 \00o\00b\00j\00e\00c\00t\00s\00 \00i\00n\00 \00t\00a\00b\00l\00e\00 \00o\00f\00 \00a\00n\00o\00t\00h\00e\00r\00 \00c\00o\00n\00t\00r\00a\00c\00t\00")
 (data (i32.const 2048) " \00\00\00t\00o\00k\00e\00n\00.\00i\00s\00s\00u\00e\00:\00 \00i\00n\00v\00a\00l\00i\00d\00 \00s\00y\00m\00b\00o\00l\00 \00n\00a\00m\00e\00")
 (data (i32.const 2120) "*\00\00\00t\00o\00k\00e\00n\00.\00i\00s\00s\00u\00e\00:\00 \00m\00e\00m\00o\00 \00h\00a\00s\00 \00m\00o\00r\00e\00 \00t\00h\00a\00n\00 \002\005\006\00 \00b\00y\00t\00e\00s\00.\00")
 (data (i32.const 2208) "&\00\00\00t\00o\00k\00e\00n\00.\00i\00s\00s\00u\00e\00:\00 \00s\00y\00m\00b\00o\00l\00 \00n\00a\00m\00e\00 \00i\00s\00 \00n\00o\00t\00 \00e\00x\00i\00s\00t\00.\00")
 (data (i32.const 2288) "\1e\00\00\00t\00o\00k\00e\00n\00.\00i\00s\00s\00u\00e\00:\00 \00i\00n\00v\00a\00l\00i\00d\00 \00q\00u\00a\00n\00t\00i\00t\00y\00.\00")
 (data (i32.const 2352) "\'\00\00\00t\00o\00k\00e\00n\00.\00i\00s\00s\00u\00e\00:\00 \00s\00y\00m\00b\00o\00l\00 \00p\00r\00e\00c\00i\00s\00i\00o\00n\00 \00m\00i\00s\00m\00a\00t\00c\00h\00.\00")
 (data (i32.const 2440) "/\00\00\00t\00o\00k\00e\00n\00.\00i\00s\00s\00u\00e\00:\00 \00q\00u\00a\00n\00t\00i\00t\00y\00 \00e\00x\00c\00e\00e\00d\00s\00 \00a\00v\00a\00i\00l\00a\00b\00l\00e\00 \00s\00u\00p\00p\00l\00y\00.\00")
 (data (i32.const 2544) "7\00\00\00o\00b\00j\00e\00c\00t\00 \00p\00a\00s\00s\00e\00d\00 \00t\00o\00 \00m\00o\00d\00i\00f\00y\00 \00i\00s\00 \00n\00o\00t\00 \00f\00o\00u\00n\00d\00 \00i\00n\00 \00t\00h\00i\00s\00 \00D\00B\00M\00a\00n\00a\00g\00e\00r\00.\00")
 (data (i32.const 2664) "4\00\00\00c\00a\00n\00 \00n\00o\00t\00 \00m\00o\00d\00i\00f\00y\00 \00o\00b\00j\00e\00c\00t\00s\00 \00i\00n\00 \00t\00a\00b\00l\00e\00 \00o\00f\00 \00a\00n\00o\00t\00h\00e\00r\00 \00c\00o\00n\00t\00r\00a\00c\00t\00.\00")
 (data (i32.const 2776) "\06\00\00\00a\00c\00t\00i\00v\00e\00")
 (data (i32.const 2792) "\00\00\00\00")
 (data (i32.const 2800) "\08\00\00\00t\00r\00a\00n\00s\00f\00e\00r\00")
 (data (i32.const 2824) "\00\00\00\00\00\00\00\00")
 (data (i32.const 2832) "\08\0b\00\00\00\00\00\00")
 (data (i32.const 2840) "\00\00\00\00\00\00\00\00")
 (data (i32.const 2848) "\18\0b\00\00\00\00\00\00")
 (data (i32.const 2856) "(\00\00\00t\00o\00k\00e\00n\00.\00t\00r\00a\00n\00s\00f\00e\00r\00:\00 \00c\00a\00n\00n\00o\00t\00 \00t\00r\00a\00n\00s\00f\00e\00r\00 \00t\00o\00 \00s\00e\00l\00f\00.\00")
 (data (i32.const 2944) "*\00\00\00t\00o\00k\00e\00n\00.\00t\00r\00a\00n\00s\00f\00e\00r\00:\00 \00t\00o\00 \00a\00c\00c\00o\00u\00n\00t\00 \00d\00o\00e\00s\00 \00n\00o\00t\00 \00e\00x\00i\00s\00t\00.\00")
 (data (i32.const 3032) "(\00\00\00t\00o\00k\00e\00n\00.\00t\00r\00a\00n\00s\00f\00e\00r\00 \00s\00y\00m\00b\00o\00l\00 \00n\00a\00m\00e\00 \00i\00s\00 \00n\00o\00t\00 \00e\00x\00i\00s\00t\00.\00")
 (data (i32.const 3120) "!\00\00\00t\00o\00k\00e\00n\00.\00t\00r\00a\00n\00s\00f\00e\00r\00:\00 \00i\00n\00v\00a\00l\00i\00d\00 \00q\00u\00a\00n\00t\00i\00t\00y\00.\00")
 (data (i32.const 3192) "*\00\00\00t\00o\00k\00e\00n\00.\00t\00r\00a\00n\00s\00f\00e\00r\00:\00 \00s\00y\00m\00b\00o\00l\00 \00p\00r\00e\00c\00i\00s\00i\00o\00n\00 \00m\00i\00s\00m\00a\00t\00c\00h\00.\00")
 (data (i32.const 3280) "-\00\00\00t\00o\00k\00e\00n\00.\00t\00r\00a\00n\00s\00f\00e\00r\00:\00 \00m\00e\00m\00o\00 \00h\00a\00s\00 \00m\00o\00r\00e\00 \00t\00h\00a\00n\00 \002\005\006\00 \00b\00y\00t\00e\00s\00.\00")
 (data (i32.const 3376) ",\00\00\00t\00o\00k\00e\00n\00.\00s\00u\00b\00B\00a\00l\00a\00n\00c\00e\00:\00 \00f\00r\00o\00m\00 \00a\00c\00c\00o\00u\00n\00t\00 \00i\00s\00 \00n\00o\00t\00 \00e\00x\00i\00s\00t\00.\00")
 (data (i32.const 3472) "&\00\00\00t\00o\00k\00e\00n\00.\00s\00u\00b\00B\00a\00l\00a\00n\00c\00e\00:\00 \00o\00v\00e\00r\00d\00r\00a\00w\00i\00n\00g\00 \00b\00a\00l\00a\00n\00c\00e\00.\00")
 (data (i32.const 3552) "3\00\00\00c\00a\00n\00 \00n\00o\00t\00 \00e\00r\00a\00s\00e\00 \00o\00b\00j\00e\00c\00t\00s\00 \00i\00n\00 \00t\00a\00b\00l\00e\00 \00o\00f\00 \00a\00n\00o\00t\00h\00e\00r\00 \00c\00o\00n\00t\00r\00a\00c\00t\00.\00")
 (data (i32.const 3664) "(\00\00\00g\00e\00t\00S\00u\00p\00p\00l\00y\00 \00f\00a\00i\00l\00e\00d\00,\00 \00s\00t\00a\00t\00e\00s\00 \00i\00s\00 \00n\00o\00t\00 \00e\00x\00i\00s\00t\00e\00d\00.\00")
 (data (i32.const 3752) "*\00\00\00g\00e\00t\00B\00a\00l\00a\00n\00c\00e\00 \00f\00a\00i\00l\00e\00d\00,\00 \00a\00c\00c\00o\00u\00n\00t\00 \00i\00s\00 \00n\00o\00t\00 \00e\00x\00i\00s\00t\00e\00d\00.\00")
 (data (i32.const 3840) "\06\00\00\00c\00r\00e\00a\00t\00e\00")
 (data (i32.const 3856) "\05\00\00\00i\00s\00s\00u\00e\00")
 (data (i32.const 3872) "\t\00\00\00g\00e\00t\00S\00u\00p\00p\00l\00y\00")
 (data (i32.const 3896) "\n\00\00\00g\00e\00t\00B\00a\00l\00a\00n\00c\00e\00")
 (export "memory" (memory $0))
 (export "MyContract#get:_receiver" (func $MyContract#get:_receiver))
 (export "MyContract#set:_receiver" (func $MyContract#set:_receiver))
 (export "MyContract#get:receiver" (func $~lib/ultrain-ts-lib/src/contract/Contract#get:receiver))
 (export "MyContract#setActionName" (func $~lib/ultrain-ts-lib/src/contract/Contract#setActionName))
 (export "MyContract#isAction" (func $~lib/ultrain-ts-lib/src/contract/Contract#isAction))
 (export "MyContract#getDataStream" (func $~lib/ultrain-ts-lib/src/contract/Contract#getDataStream))
 (export "MyContract#onInit" (func $~lib/ultrain-ts-lib/src/contract/Contract#onInit))
 (export "MyContract#onStop" (func $~lib/ultrain-ts-lib/src/contract/Contract#onStop))
 (export "MyContract#create" (func $contract/token/MyContract#create))
 (export "MyContract#issue" (func $contract/token/MyContract#issue))
 (export "MyContract#transfer" (func $contract/token/MyContract#transfer))
 (export "MyContract#getSupply" (func $contract/token/MyContract#getSupply))
 (export "MyContract#getBalance" (func $contract/token/MyContract#getBalance))
 (export "apply" (func $contract/token/apply))
 (start $start)
 (func $~lib/allocator/arena/__memory_allocate (; 17 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (if
   (i32.gt_u
    (get_local $0)
    (get_global $~lib/internal/allocator/MAX_SIZE_32)
   )
   (unreachable)
  )
  (set_local $1
   (get_global $~lib/allocator/arena/offset)
  )
  (set_local $4
   (i32.and
    (i32.add
     (i32.add
      (get_local $1)
      (select
       (tee_local $2
        (get_local $0)
       )
       (tee_local $3
        (i32.const 1)
       )
       (i32.gt_u
        (get_local $2)
        (get_local $3)
       )
      )
     )
     (get_global $~lib/internal/allocator/AL_MASK)
    )
    (i32.xor
     (get_global $~lib/internal/allocator/AL_MASK)
     (i32.const -1)
    )
   )
  )
  (set_local $5
   (current_memory)
  )
  (if
   (i32.gt_u
    (get_local $4)
    (i32.shl
     (get_local $5)
     (i32.const 16)
    )
   )
   (block
    (set_local $2
     (i32.shr_u
      (i32.and
       (i32.add
        (i32.sub
         (get_local $4)
         (get_local $1)
        )
        (i32.const 65535)
       )
       (i32.xor
        (i32.const 65535)
        (i32.const -1)
       )
      )
      (i32.const 16)
     )
    )
    (set_local $3
     (select
      (tee_local $3
       (get_local $5)
      )
      (tee_local $6
       (get_local $2)
      )
      (i32.gt_s
       (get_local $3)
       (get_local $6)
      )
     )
    )
    (if
     (i32.lt_s
      (grow_memory
       (get_local $3)
      )
      (i32.const 0)
     )
     (if
      (i32.lt_s
       (grow_memory
        (get_local $2)
       )
       (i32.const 0)
      )
      (unreachable)
     )
    )
   )
  )
  (set_global $~lib/allocator/arena/offset
   (get_local $4)
  )
  (get_local $1)
 )
 (func $~lib/memory/memory.allocate (; 18 ;) (type $ii) (param $0 i32) (result i32)
  (return
   (call $~lib/allocator/arena/__memory_allocate
    (get_local $0)
   )
  )
 )
 (func $~lib/internal/arraybuffer/computeSize (; 19 ;) (type $ii) (param $0 i32) (result i32)
  (i32.shl
   (i32.const 1)
   (i32.sub
    (i32.const 32)
    (i32.clz
     (i32.sub
      (i32.add
       (get_local $0)
       (get_global $~lib/internal/arraybuffer/HEADER_SIZE)
      )
      (i32.const 1)
     )
    )
   )
  )
 )
 (func $~lib/internal/arraybuffer/allocateUnsafe (; 20 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (if
   (i32.eqz
    (i32.le_u
     (get_local $0)
     (get_global $~lib/internal/arraybuffer/MAX_BLENGTH)
    )
   )
   (block
    (call $~lib/env/abort)
    (unreachable)
   )
  )
  (set_local $1
   (block $~lib/memory/memory.allocate|inlined.0 (result i32)
    (set_local $2
     (call $~lib/internal/arraybuffer/computeSize
      (get_local $0)
     )
    )
    (br $~lib/memory/memory.allocate|inlined.0
     (call $~lib/allocator/arena/__memory_allocate
      (get_local $2)
     )
    )
   )
  )
  (i32.store
   (get_local $1)
   (get_local $0)
  )
  (get_local $1)
 )
 (func $~lib/internal/memory/memset (; 21 ;) (type $iiiv) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i64)
  (if
   (i32.eqz
    (get_local $2)
   )
   (return)
  )
  (i32.store8
   (get_local $0)
   (get_local $1)
  )
  (i32.store8
   (i32.sub
    (i32.add
     (get_local $0)
     (get_local $2)
    )
    (i32.const 1)
   )
   (get_local $1)
  )
  (if
   (i32.le_u
    (get_local $2)
    (i32.const 2)
   )
   (return)
  )
  (i32.store8
   (i32.add
    (get_local $0)
    (i32.const 1)
   )
   (get_local $1)
  )
  (i32.store8
   (i32.add
    (get_local $0)
    (i32.const 2)
   )
   (get_local $1)
  )
  (i32.store8
   (i32.sub
    (i32.add
     (get_local $0)
     (get_local $2)
    )
    (i32.const 2)
   )
   (get_local $1)
  )
  (i32.store8
   (i32.sub
    (i32.add
     (get_local $0)
     (get_local $2)
    )
    (i32.const 3)
   )
   (get_local $1)
  )
  (if
   (i32.le_u
    (get_local $2)
    (i32.const 6)
   )
   (return)
  )
  (i32.store8
   (i32.add
    (get_local $0)
    (i32.const 3)
   )
   (get_local $1)
  )
  (i32.store8
   (i32.sub
    (i32.add
     (get_local $0)
     (get_local $2)
    )
    (i32.const 4)
   )
   (get_local $1)
  )
  (if
   (i32.le_u
    (get_local $2)
    (i32.const 8)
   )
   (return)
  )
  (set_local $3
   (i32.and
    (i32.sub
     (i32.const 0)
     (get_local $0)
    )
    (i32.const 3)
   )
  )
  (set_local $0
   (i32.add
    (get_local $0)
    (get_local $3)
   )
  )
  (set_local $2
   (i32.sub
    (get_local $2)
    (get_local $3)
   )
  )
  (set_local $2
   (i32.and
    (get_local $2)
    (i32.const -4)
   )
  )
  (set_local $4
   (i32.mul
    (i32.div_u
     (i32.const -1)
     (i32.const 255)
    )
    (i32.and
     (get_local $1)
     (i32.const 255)
    )
   )
  )
  (i32.store
   (get_local $0)
   (get_local $4)
  )
  (i32.store
   (i32.sub
    (i32.add
     (get_local $0)
     (get_local $2)
    )
    (i32.const 4)
   )
   (get_local $4)
  )
  (if
   (i32.le_u
    (get_local $2)
    (i32.const 8)
   )
   (return)
  )
  (i32.store
   (i32.add
    (get_local $0)
    (i32.const 4)
   )
   (get_local $4)
  )
  (i32.store
   (i32.add
    (get_local $0)
    (i32.const 8)
   )
   (get_local $4)
  )
  (i32.store
   (i32.sub
    (i32.add
     (get_local $0)
     (get_local $2)
    )
    (i32.const 12)
   )
   (get_local $4)
  )
  (i32.store
   (i32.sub
    (i32.add
     (get_local $0)
     (get_local $2)
    )
    (i32.const 8)
   )
   (get_local $4)
  )
  (if
   (i32.le_u
    (get_local $2)
    (i32.const 24)
   )
   (return)
  )
  (i32.store
   (i32.add
    (get_local $0)
    (i32.const 12)
   )
   (get_local $4)
  )
  (i32.store
   (i32.add
    (get_local $0)
    (i32.const 16)
   )
   (get_local $4)
  )
  (i32.store
   (i32.add
    (get_local $0)
    (i32.const 20)
   )
   (get_local $4)
  )
  (i32.store
   (i32.add
    (get_local $0)
    (i32.const 24)
   )
   (get_local $4)
  )
  (i32.store
   (i32.sub
    (i32.add
     (get_local $0)
     (get_local $2)
    )
    (i32.const 28)
   )
   (get_local $4)
  )
  (i32.store
   (i32.sub
    (i32.add
     (get_local $0)
     (get_local $2)
    )
    (i32.const 24)
   )
   (get_local $4)
  )
  (i32.store
   (i32.sub
    (i32.add
     (get_local $0)
     (get_local $2)
    )
    (i32.const 20)
   )
   (get_local $4)
  )
  (i32.store
   (i32.sub
    (i32.add
     (get_local $0)
     (get_local $2)
    )
    (i32.const 16)
   )
   (get_local $4)
  )
  (set_local $3
   (i32.add
    (i32.const 24)
    (i32.and
     (get_local $0)
     (i32.const 4)
    )
   )
  )
  (set_local $0
   (i32.add
    (get_local $0)
    (get_local $3)
   )
  )
  (set_local $2
   (i32.sub
    (get_local $2)
    (get_local $3)
   )
  )
  (set_local $5
   (i64.or
    (i64.extend_u/i32
     (get_local $4)
    )
    (i64.shl
     (i64.extend_u/i32
      (get_local $4)
     )
     (i64.const 32)
    )
   )
  )
  (block $break|0
   (loop $continue|0
    (if
     (i32.ge_u
      (get_local $2)
      (i32.const 32)
     )
     (block
      (block
       (i64.store
        (get_local $0)
        (get_local $5)
       )
       (i64.store
        (i32.add
         (get_local $0)
         (i32.const 8)
        )
        (get_local $5)
       )
       (i64.store
        (i32.add
         (get_local $0)
         (i32.const 16)
        )
        (get_local $5)
       )
       (i64.store
        (i32.add
         (get_local $0)
         (i32.const 24)
        )
        (get_local $5)
       )
       (set_local $2
        (i32.sub
         (get_local $2)
         (i32.const 32)
        )
       )
       (set_local $0
        (i32.add
         (get_local $0)
         (i32.const 32)
        )
       )
      )
      (br $continue|0)
     )
    )
   )
  )
 )
 (func $~lib/array/Array<u8>#constructor (; 22 ;) (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (if
   (i32.gt_u
    (get_local $1)
    (i32.const 1073741816)
   )
   (block
    (call $~lib/env/abort)
    (unreachable)
   )
  )
  (set_local $2
   (i32.shl
    (get_local $1)
    (i32.const 0)
   )
  )
  (set_local $3
   (call $~lib/internal/arraybuffer/allocateUnsafe
    (get_local $2)
   )
  )
  (i32.store
   (tee_local $0
    (if (result i32)
     (get_local $0)
     (get_local $0)
     (tee_local $0
      (block (result i32)
       (set_local $4
        (call $~lib/memory/memory.allocate
         (i32.const 8)
        )
       )
       (i32.store
        (get_local $4)
        (i32.const 0)
       )
       (i32.store offset=4
        (get_local $4)
        (i32.const 0)
       )
       (get_local $4)
      )
     )
    )
   )
   (get_local $3)
  )
  (i32.store offset=4
   (get_local $0)
   (get_local $1)
  )
  (block $~lib/memory/memory.fill|inlined.0
   (set_local $4
    (i32.add
     (get_local $3)
     (get_global $~lib/internal/arraybuffer/HEADER_SIZE)
    )
   )
   (set_local $5
    (i32.const 0)
   )
   (call $~lib/internal/memory/memset
    (get_local $4)
    (get_local $5)
    (get_local $2)
   )
  )
  (get_local $0)
 )
 (func $~lib/string/String#charCodeAt (; 23 ;) (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (if
   (i32.eqz
    (i32.ne
     (get_local $0)
     (i32.const 0)
    )
   )
   (block
    (call $~lib/env/abort)
    (unreachable)
   )
  )
  (if
   (i32.ge_u
    (get_local $1)
    (i32.load
     (get_local $0)
    )
   )
   (return
    (i32.const -1)
   )
  )
  (i32.load16_u offset=4
   (i32.add
    (get_local $0)
    (i32.shl
     (get_local $1)
     (i32.const 1)
    )
   )
  )
 )
 (func $~lib/internal/memory/memcpy (; 24 ;) (type $iiiv) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (block $break|0
   (loop $continue|0
    (if
     (if (result i32)
      (get_local $2)
      (i32.and
       (get_local $1)
       (i32.const 3)
      )
      (get_local $2)
     )
     (block
      (block
       (i32.store8
        (block (result i32)
         (set_local $5
          (get_local $0)
         )
         (set_local $0
          (i32.add
           (get_local $5)
           (i32.const 1)
          )
         )
         (get_local $5)
        )
        (i32.load8_u
         (block (result i32)
          (set_local $5
           (get_local $1)
          )
          (set_local $1
           (i32.add
            (get_local $5)
            (i32.const 1)
           )
          )
          (get_local $5)
         )
        )
       )
       (set_local $2
        (i32.sub
         (get_local $2)
         (i32.const 1)
        )
       )
      )
      (br $continue|0)
     )
    )
   )
  )
  (if
   (i32.eq
    (i32.and
     (get_local $0)
     (i32.const 3)
    )
    (i32.const 0)
   )
   (block
    (block $break|1
     (loop $continue|1
      (if
       (i32.ge_u
        (get_local $2)
        (i32.const 16)
       )
       (block
        (block
         (i32.store
          (get_local $0)
          (i32.load
           (get_local $1)
          )
         )
         (i32.store
          (i32.add
           (get_local $0)
           (i32.const 4)
          )
          (i32.load
           (i32.add
            (get_local $1)
            (i32.const 4)
           )
          )
         )
         (i32.store
          (i32.add
           (get_local $0)
           (i32.const 8)
          )
          (i32.load
           (i32.add
            (get_local $1)
            (i32.const 8)
           )
          )
         )
         (i32.store
          (i32.add
           (get_local $0)
           (i32.const 12)
          )
          (i32.load
           (i32.add
            (get_local $1)
            (i32.const 12)
           )
          )
         )
         (set_local $1
          (i32.add
           (get_local $1)
           (i32.const 16)
          )
         )
         (set_local $0
          (i32.add
           (get_local $0)
           (i32.const 16)
          )
         )
         (set_local $2
          (i32.sub
           (get_local $2)
           (i32.const 16)
          )
         )
        )
        (br $continue|1)
       )
      )
     )
    )
    (if
     (i32.and
      (get_local $2)
      (i32.const 8)
     )
     (block
      (i32.store
       (get_local $0)
       (i32.load
        (get_local $1)
       )
      )
      (i32.store
       (i32.add
        (get_local $0)
        (i32.const 4)
       )
       (i32.load
        (i32.add
         (get_local $1)
         (i32.const 4)
        )
       )
      )
      (set_local $0
       (i32.add
        (get_local $0)
        (i32.const 8)
       )
      )
      (set_local $1
       (i32.add
        (get_local $1)
        (i32.const 8)
       )
      )
     )
    )
    (if
     (i32.and
      (get_local $2)
      (i32.const 4)
     )
     (block
      (i32.store
       (get_local $0)
       (i32.load
        (get_local $1)
       )
      )
      (set_local $0
       (i32.add
        (get_local $0)
        (i32.const 4)
       )
      )
      (set_local $1
       (i32.add
        (get_local $1)
        (i32.const 4)
       )
      )
     )
    )
    (if
     (i32.and
      (get_local $2)
      (i32.const 2)
     )
     (block
      (i32.store16
       (get_local $0)
       (i32.load16_u
        (get_local $1)
       )
      )
      (set_local $0
       (i32.add
        (get_local $0)
        (i32.const 2)
       )
      )
      (set_local $1
       (i32.add
        (get_local $1)
        (i32.const 2)
       )
      )
     )
    )
    (if
     (i32.and
      (get_local $2)
      (i32.const 1)
     )
     (i32.store8
      (block (result i32)
       (set_local $5
        (get_local $0)
       )
       (set_local $0
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
      (i32.load8_u
       (block (result i32)
        (set_local $5
         (get_local $1)
        )
        (set_local $1
         (i32.add
          (get_local $5)
          (i32.const 1)
         )
        )
        (get_local $5)
       )
      )
     )
    )
    (return)
   )
  )
  (if
   (i32.ge_u
    (get_local $2)
    (i32.const 32)
   )
   (block $break|2
    (block $case2|2
     (block $case1|2
      (block $case0|2
       (set_local $5
        (i32.and
         (get_local $0)
         (i32.const 3)
        )
       )
       (br_if $case0|2
        (i32.eq
         (get_local $5)
         (i32.const 1)
        )
       )
       (br_if $case1|2
        (i32.eq
         (get_local $5)
         (i32.const 2)
        )
       )
       (br_if $case2|2
        (i32.eq
         (get_local $5)
         (i32.const 3)
        )
       )
       (br $break|2)
      )
      (block
       (set_local $3
        (i32.load
         (get_local $1)
        )
       )
       (i32.store8
        (block (result i32)
         (set_local $5
          (get_local $0)
         )
         (set_local $0
          (i32.add
           (get_local $5)
           (i32.const 1)
          )
         )
         (get_local $5)
        )
        (i32.load8_u
         (block (result i32)
          (set_local $5
           (get_local $1)
          )
          (set_local $1
           (i32.add
            (get_local $5)
            (i32.const 1)
           )
          )
          (get_local $5)
         )
        )
       )
       (i32.store8
        (block (result i32)
         (set_local $5
          (get_local $0)
         )
         (set_local $0
          (i32.add
           (get_local $5)
           (i32.const 1)
          )
         )
         (get_local $5)
        )
        (i32.load8_u
         (block (result i32)
          (set_local $5
           (get_local $1)
          )
          (set_local $1
           (i32.add
            (get_local $5)
            (i32.const 1)
           )
          )
          (get_local $5)
         )
        )
       )
       (i32.store8
        (block (result i32)
         (set_local $5
          (get_local $0)
         )
         (set_local $0
          (i32.add
           (get_local $5)
           (i32.const 1)
          )
         )
         (get_local $5)
        )
        (i32.load8_u
         (block (result i32)
          (set_local $5
           (get_local $1)
          )
          (set_local $1
           (i32.add
            (get_local $5)
            (i32.const 1)
           )
          )
          (get_local $5)
         )
        )
       )
       (set_local $2
        (i32.sub
         (get_local $2)
         (i32.const 3)
        )
       )
       (block $break|3
        (loop $continue|3
         (if
          (i32.ge_u
           (get_local $2)
           (i32.const 17)
          )
          (block
           (block
            (set_local $4
             (i32.load
              (i32.add
               (get_local $1)
               (i32.const 1)
              )
             )
            )
            (i32.store
             (get_local $0)
             (i32.or
              (i32.shr_u
               (get_local $3)
               (i32.const 24)
              )
              (i32.shl
               (get_local $4)
               (i32.const 8)
              )
             )
            )
            (set_local $3
             (i32.load
              (i32.add
               (get_local $1)
               (i32.const 5)
              )
             )
            )
            (i32.store
             (i32.add
              (get_local $0)
              (i32.const 4)
             )
             (i32.or
              (i32.shr_u
               (get_local $4)
               (i32.const 24)
              )
              (i32.shl
               (get_local $3)
               (i32.const 8)
              )
             )
            )
            (set_local $4
             (i32.load
              (i32.add
               (get_local $1)
               (i32.const 9)
              )
             )
            )
            (i32.store
             (i32.add
              (get_local $0)
              (i32.const 8)
             )
             (i32.or
              (i32.shr_u
               (get_local $3)
               (i32.const 24)
              )
              (i32.shl
               (get_local $4)
               (i32.const 8)
              )
             )
            )
            (set_local $3
             (i32.load
              (i32.add
               (get_local $1)
               (i32.const 13)
              )
             )
            )
            (i32.store
             (i32.add
              (get_local $0)
              (i32.const 12)
             )
             (i32.or
              (i32.shr_u
               (get_local $4)
               (i32.const 24)
              )
              (i32.shl
               (get_local $3)
               (i32.const 8)
              )
             )
            )
            (set_local $1
             (i32.add
              (get_local $1)
              (i32.const 16)
             )
            )
            (set_local $0
             (i32.add
              (get_local $0)
              (i32.const 16)
             )
            )
            (set_local $2
             (i32.sub
              (get_local $2)
              (i32.const 16)
             )
            )
           )
           (br $continue|3)
          )
         )
        )
       )
       (br $break|2)
      )
     )
     (block
      (set_local $3
       (i32.load
        (get_local $1)
       )
      )
      (i32.store8
       (block (result i32)
        (set_local $5
         (get_local $0)
        )
        (set_local $0
         (i32.add
          (get_local $5)
          (i32.const 1)
         )
        )
        (get_local $5)
       )
       (i32.load8_u
        (block (result i32)
         (set_local $5
          (get_local $1)
         )
         (set_local $1
          (i32.add
           (get_local $5)
           (i32.const 1)
          )
         )
         (get_local $5)
        )
       )
      )
      (i32.store8
       (block (result i32)
        (set_local $5
         (get_local $0)
        )
        (set_local $0
         (i32.add
          (get_local $5)
          (i32.const 1)
         )
        )
        (get_local $5)
       )
       (i32.load8_u
        (block (result i32)
         (set_local $5
          (get_local $1)
         )
         (set_local $1
          (i32.add
           (get_local $5)
           (i32.const 1)
          )
         )
         (get_local $5)
        )
       )
      )
      (set_local $2
       (i32.sub
        (get_local $2)
        (i32.const 2)
       )
      )
      (block $break|4
       (loop $continue|4
        (if
         (i32.ge_u
          (get_local $2)
          (i32.const 18)
         )
         (block
          (block
           (set_local $4
            (i32.load
             (i32.add
              (get_local $1)
              (i32.const 2)
             )
            )
           )
           (i32.store
            (get_local $0)
            (i32.or
             (i32.shr_u
              (get_local $3)
              (i32.const 16)
             )
             (i32.shl
              (get_local $4)
              (i32.const 16)
             )
            )
           )
           (set_local $3
            (i32.load
             (i32.add
              (get_local $1)
              (i32.const 6)
             )
            )
           )
           (i32.store
            (i32.add
             (get_local $0)
             (i32.const 4)
            )
            (i32.or
             (i32.shr_u
              (get_local $4)
              (i32.const 16)
             )
             (i32.shl
              (get_local $3)
              (i32.const 16)
             )
            )
           )
           (set_local $4
            (i32.load
             (i32.add
              (get_local $1)
              (i32.const 10)
             )
            )
           )
           (i32.store
            (i32.add
             (get_local $0)
             (i32.const 8)
            )
            (i32.or
             (i32.shr_u
              (get_local $3)
              (i32.const 16)
             )
             (i32.shl
              (get_local $4)
              (i32.const 16)
             )
            )
           )
           (set_local $3
            (i32.load
             (i32.add
              (get_local $1)
              (i32.const 14)
             )
            )
           )
           (i32.store
            (i32.add
             (get_local $0)
             (i32.const 12)
            )
            (i32.or
             (i32.shr_u
              (get_local $4)
              (i32.const 16)
             )
             (i32.shl
              (get_local $3)
              (i32.const 16)
             )
            )
           )
           (set_local $1
            (i32.add
             (get_local $1)
             (i32.const 16)
            )
           )
           (set_local $0
            (i32.add
             (get_local $0)
             (i32.const 16)
            )
           )
           (set_local $2
            (i32.sub
             (get_local $2)
             (i32.const 16)
            )
           )
          )
          (br $continue|4)
         )
        )
       )
      )
      (br $break|2)
     )
    )
    (block
     (set_local $3
      (i32.load
       (get_local $1)
      )
     )
     (i32.store8
      (block (result i32)
       (set_local $5
        (get_local $0)
       )
       (set_local $0
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
      (i32.load8_u
       (block (result i32)
        (set_local $5
         (get_local $1)
        )
        (set_local $1
         (i32.add
          (get_local $5)
          (i32.const 1)
         )
        )
        (get_local $5)
       )
      )
     )
     (set_local $2
      (i32.sub
       (get_local $2)
       (i32.const 1)
      )
     )
     (block $break|5
      (loop $continue|5
       (if
        (i32.ge_u
         (get_local $2)
         (i32.const 19)
        )
        (block
         (block
          (set_local $4
           (i32.load
            (i32.add
             (get_local $1)
             (i32.const 3)
            )
           )
          )
          (i32.store
           (get_local $0)
           (i32.or
            (i32.shr_u
             (get_local $3)
             (i32.const 8)
            )
            (i32.shl
             (get_local $4)
             (i32.const 24)
            )
           )
          )
          (set_local $3
           (i32.load
            (i32.add
             (get_local $1)
             (i32.const 7)
            )
           )
          )
          (i32.store
           (i32.add
            (get_local $0)
            (i32.const 4)
           )
           (i32.or
            (i32.shr_u
             (get_local $4)
             (i32.const 8)
            )
            (i32.shl
             (get_local $3)
             (i32.const 24)
            )
           )
          )
          (set_local $4
           (i32.load
            (i32.add
             (get_local $1)
             (i32.const 11)
            )
           )
          )
          (i32.store
           (i32.add
            (get_local $0)
            (i32.const 8)
           )
           (i32.or
            (i32.shr_u
             (get_local $3)
             (i32.const 8)
            )
            (i32.shl
             (get_local $4)
             (i32.const 24)
            )
           )
          )
          (set_local $3
           (i32.load
            (i32.add
             (get_local $1)
             (i32.const 15)
            )
           )
          )
          (i32.store
           (i32.add
            (get_local $0)
            (i32.const 12)
           )
           (i32.or
            (i32.shr_u
             (get_local $4)
             (i32.const 8)
            )
            (i32.shl
             (get_local $3)
             (i32.const 24)
            )
           )
          )
          (set_local $1
           (i32.add
            (get_local $1)
            (i32.const 16)
           )
          )
          (set_local $0
           (i32.add
            (get_local $0)
            (i32.const 16)
           )
          )
          (set_local $2
           (i32.sub
            (get_local $2)
            (i32.const 16)
           )
          )
         )
         (br $continue|5)
        )
       )
      )
     )
     (br $break|2)
    )
   )
  )
  (if
   (i32.and
    (get_local $2)
    (i32.const 16)
   )
   (block
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
   )
  )
  (if
   (i32.and
    (get_local $2)
    (i32.const 8)
   )
   (block
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
   )
  )
  (if
   (i32.and
    (get_local $2)
    (i32.const 4)
   )
   (block
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
   )
  )
  (if
   (i32.and
    (get_local $2)
    (i32.const 2)
   )
   (block
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (set_local $5
       (get_local $0)
      )
      (set_local $0
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
     (i32.load8_u
      (block (result i32)
       (set_local $5
        (get_local $1)
       )
       (set_local $1
        (i32.add
         (get_local $5)
         (i32.const 1)
        )
       )
       (get_local $5)
      )
     )
    )
   )
  )
  (if
   (i32.and
    (get_local $2)
    (i32.const 1)
   )
   (i32.store8
    (block (result i32)
     (set_local $5
      (get_local $0)
     )
     (set_local $0
      (i32.add
       (get_local $5)
       (i32.const 1)
      )
     )
     (get_local $5)
    )
    (i32.load8_u
     (block (result i32)
      (set_local $5
       (get_local $1)
      )
      (set_local $1
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $5)
     )
    )
   )
  )
 )
 (func $~lib/internal/memory/memmove (; 25 ;) (type $iiiv) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (if
   (i32.eq
    (get_local $0)
    (get_local $1)
   )
   (return)
  )
  (if
   (if (result i32)
    (tee_local $3
     (i32.le_u
      (i32.add
       (get_local $1)
       (get_local $2)
      )
      (get_local $0)
     )
    )
    (get_local $3)
    (i32.le_u
     (i32.add
      (get_local $0)
      (get_local $2)
     )
     (get_local $1)
    )
   )
   (block
    (call $~lib/internal/memory/memcpy
     (get_local $0)
     (get_local $1)
     (get_local $2)
    )
    (return)
   )
  )
  (if
   (i32.lt_u
    (get_local $0)
    (get_local $1)
   )
   (block
    (if
     (i32.eq
      (i32.and
       (get_local $1)
       (i32.const 7)
      )
      (i32.and
       (get_local $0)
       (i32.const 7)
      )
     )
     (block
      (block $break|0
       (loop $continue|0
        (if
         (i32.and
          (get_local $0)
          (i32.const 7)
         )
         (block
          (block
           (if
            (i32.eqz
             (get_local $2)
            )
            (return)
           )
           (set_local $2
            (i32.sub
             (get_local $2)
             (i32.const 1)
            )
           )
           (i32.store8
            (block (result i32)
             (set_local $3
              (get_local $0)
             )
             (set_local $0
              (i32.add
               (get_local $3)
               (i32.const 1)
              )
             )
             (get_local $3)
            )
            (i32.load8_u
             (block (result i32)
              (set_local $3
               (get_local $1)
              )
              (set_local $1
               (i32.add
                (get_local $3)
                (i32.const 1)
               )
              )
              (get_local $3)
             )
            )
           )
          )
          (br $continue|0)
         )
        )
       )
      )
      (block $break|1
       (loop $continue|1
        (if
         (i32.ge_u
          (get_local $2)
          (i32.const 8)
         )
         (block
          (block
           (i64.store
            (get_local $0)
            (i64.load
             (get_local $1)
            )
           )
           (set_local $2
            (i32.sub
             (get_local $2)
             (i32.const 8)
            )
           )
           (set_local $0
            (i32.add
             (get_local $0)
             (i32.const 8)
            )
           )
           (set_local $1
            (i32.add
             (get_local $1)
             (i32.const 8)
            )
           )
          )
          (br $continue|1)
         )
        )
       )
      )
     )
    )
    (block $break|2
     (loop $continue|2
      (if
       (get_local $2)
       (block
        (block
         (i32.store8
          (block (result i32)
           (set_local $3
            (get_local $0)
           )
           (set_local $0
            (i32.add
             (get_local $3)
             (i32.const 1)
            )
           )
           (get_local $3)
          )
          (i32.load8_u
           (block (result i32)
            (set_local $3
             (get_local $1)
            )
            (set_local $1
             (i32.add
              (get_local $3)
              (i32.const 1)
             )
            )
            (get_local $3)
           )
          )
         )
         (set_local $2
          (i32.sub
           (get_local $2)
           (i32.const 1)
          )
         )
        )
        (br $continue|2)
       )
      )
     )
    )
   )
   (block
    (if
     (i32.eq
      (i32.and
       (get_local $1)
       (i32.const 7)
      )
      (i32.and
       (get_local $0)
       (i32.const 7)
      )
     )
     (block
      (block $break|3
       (loop $continue|3
        (if
         (i32.and
          (i32.add
           (get_local $0)
           (get_local $2)
          )
          (i32.const 7)
         )
         (block
          (block
           (if
            (i32.eqz
             (get_local $2)
            )
            (return)
           )
           (i32.store8
            (i32.add
             (get_local $0)
             (tee_local $2
              (i32.sub
               (get_local $2)
               (i32.const 1)
              )
             )
            )
            (i32.load8_u
             (i32.add
              (get_local $1)
              (get_local $2)
             )
            )
           )
          )
          (br $continue|3)
         )
        )
       )
      )
      (block $break|4
       (loop $continue|4
        (if
         (i32.ge_u
          (get_local $2)
          (i32.const 8)
         )
         (block
          (block
           (set_local $2
            (i32.sub
             (get_local $2)
             (i32.const 8)
            )
           )
           (i64.store
            (i32.add
             (get_local $0)
             (get_local $2)
            )
            (i64.load
             (i32.add
              (get_local $1)
              (get_local $2)
             )
            )
           )
          )
          (br $continue|4)
         )
        )
       )
      )
     )
    )
    (block $break|5
     (loop $continue|5
      (if
       (get_local $2)
       (block
        (i32.store8
         (i32.add
          (get_local $0)
          (tee_local $2
           (i32.sub
            (get_local $2)
            (i32.const 1)
           )
          )
         )
         (i32.load8_u
          (i32.add
           (get_local $1)
           (get_local $2)
          )
         )
        )
        (br $continue|5)
       )
      )
     )
    )
   )
  )
 )
 (func $~lib/internal/arraybuffer/reallocateUnsafe (; 26 ;) (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (set_local $2
   (i32.load
    (get_local $0)
   )
  )
  (if
   (i32.gt_s
    (get_local $1)
    (get_local $2)
   )
   (block
    (if
     (i32.eqz
      (i32.le_s
       (get_local $1)
       (get_global $~lib/internal/arraybuffer/MAX_BLENGTH)
      )
     )
     (block
      (call $~lib/env/abort)
      (unreachable)
     )
    )
    (if
     (i32.le_s
      (get_local $1)
      (i32.sub
       (call $~lib/internal/arraybuffer/computeSize
        (get_local $2)
       )
       (get_global $~lib/internal/arraybuffer/HEADER_SIZE)
      )
     )
     (block
      (i32.store
       (get_local $0)
       (get_local $1)
      )
      (block $~lib/memory/memory.fill|inlined.1
       (set_local $3
        (i32.add
         (i32.add
          (get_local $0)
          (get_global $~lib/internal/arraybuffer/HEADER_SIZE)
         )
         (get_local $2)
        )
       )
       (set_local $4
        (i32.const 0)
       )
       (set_local $5
        (i32.sub
         (get_local $1)
         (get_local $2)
        )
       )
       (call $~lib/internal/memory/memset
        (get_local $3)
        (get_local $4)
        (get_local $5)
       )
      )
     )
     (block
      (set_local $5
       (call $~lib/internal/arraybuffer/allocateUnsafe
        (get_local $1)
       )
      )
      (block $~lib/memory/memory.copy|inlined.0
       (set_local $4
        (i32.add
         (get_local $5)
         (get_global $~lib/internal/arraybuffer/HEADER_SIZE)
        )
       )
       (set_local $3
        (i32.add
         (get_local $0)
         (get_global $~lib/internal/arraybuffer/HEADER_SIZE)
        )
       )
       (call $~lib/internal/memory/memmove
        (get_local $4)
        (get_local $3)
        (get_local $2)
       )
      )
      (block $~lib/memory/memory.fill|inlined.2
       (set_local $3
        (i32.add
         (i32.add
          (get_local $5)
          (get_global $~lib/internal/arraybuffer/HEADER_SIZE)
         )
         (get_local $2)
        )
       )
       (set_local $4
        (i32.const 0)
       )
       (set_local $6
        (i32.sub
         (get_local $1)
         (get_local $2)
        )
       )
       (call $~lib/internal/memory/memset
        (get_local $3)
        (get_local $4)
        (get_local $6)
       )
      )
      (return
       (get_local $5)
      )
     )
    )
   )
   (if
    (i32.lt_s
     (get_local $1)
     (get_local $2)
    )
    (block
     (if
      (i32.eqz
       (i32.ge_s
        (get_local $1)
        (i32.const 0)
       )
      )
      (block
       (call $~lib/env/abort)
       (unreachable)
      )
     )
     (i32.store
      (get_local $0)
      (get_local $1)
     )
    )
   )
  )
  (get_local $0)
 )
 (func $~lib/array/Array<u8>#push (; 27 ;) (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (set_local $2
   (i32.load offset=4
    (get_local $0)
   )
  )
  (set_local $3
   (i32.load
    (get_local $0)
   )
  )
  (set_local $4
   (i32.shr_u
    (i32.load
     (get_local $3)
    )
    (i32.const 0)
   )
  )
  (set_local $5
   (i32.add
    (get_local $2)
    (i32.const 1)
   )
  )
  (if
   (i32.ge_u
    (get_local $2)
    (get_local $4)
   )
   (block
    (if
     (i32.ge_u
      (get_local $2)
      (i32.const 1073741816)
     )
     (block
      (call $~lib/env/abort)
      (unreachable)
     )
    )
    (set_local $3
     (call $~lib/internal/arraybuffer/reallocateUnsafe
      (get_local $3)
      (i32.shl
       (get_local $5)
       (i32.const 0)
      )
     )
    )
    (i32.store
     (get_local $0)
     (get_local $3)
    )
   )
  )
  (i32.store offset=4
   (get_local $0)
   (get_local $5)
  )
  (block $~lib/internal/arraybuffer/storeUnsafe<u8_u8>|inlined.0
   (i32.store8 offset=8
    (i32.add
     (get_local $3)
     (i32.shl
      (get_local $2)
      (i32.const 0)
     )
    )
    (get_local $1)
   )
  )
  (get_local $5)
 )
 (func $~lib/utf8util/toUTF8Array (; 28 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (set_local $1
   (call $~lib/array/Array<u8>#constructor
    (i32.const 0)
    (i32.const 0)
   )
  )
  (block $break|0
   (set_local $2
    (i32.const 0)
   )
   (loop $repeat|0
    (br_if $break|0
     (i32.eqz
      (i32.lt_s
       (get_local $2)
       (i32.load
        (get_local $0)
       )
      )
     )
    )
    (block
     (set_local $3
      (call $~lib/string/String#charCodeAt
       (get_local $0)
       (get_local $2)
      )
     )
     (if
      (i32.lt_s
       (get_local $3)
       (i32.const 128)
      )
      (drop
       (call $~lib/array/Array<u8>#push
        (get_local $1)
        (get_local $3)
       )
      )
      (if
       (i32.lt_s
        (get_local $3)
        (i32.const 2048)
       )
       (block
        (drop
         (call $~lib/array/Array<u8>#push
          (get_local $1)
          (i32.or
           (i32.const 192)
           (i32.shr_s
            (get_local $3)
            (i32.const 6)
           )
          )
         )
        )
        (drop
         (call $~lib/array/Array<u8>#push
          (get_local $1)
          (i32.or
           (i32.const 128)
           (i32.and
            (get_local $3)
            (i32.const 63)
           )
          )
         )
        )
       )
       (if
        (if (result i32)
         (tee_local $4
          (i32.lt_s
           (get_local $3)
           (i32.const 55296)
          )
         )
         (get_local $4)
         (i32.ge_s
          (get_local $3)
          (i32.const 57344)
         )
        )
        (block
         (drop
          (call $~lib/array/Array<u8>#push
           (get_local $1)
           (i32.or
            (i32.const 224)
            (i32.shr_s
             (get_local $3)
             (i32.const 12)
            )
           )
          )
         )
         (drop
          (call $~lib/array/Array<u8>#push
           (get_local $1)
           (i32.or
            (i32.const 128)
            (i32.and
             (i32.shr_s
              (get_local $3)
              (i32.const 6)
             )
             (i32.const 63)
            )
           )
          )
         )
         (drop
          (call $~lib/array/Array<u8>#push
           (get_local $1)
           (i32.or
            (i32.const 128)
            (i32.and
             (get_local $3)
             (i32.const 63)
            )
           )
          )
         )
        )
        (block
         (set_local $2
          (i32.add
           (get_local $2)
           (i32.const 1)
          )
         )
         (set_local $3
          (i32.add
           (i32.const 65536)
           (i32.or
            (i32.shl
             (i32.and
              (get_local $3)
              (i32.const 1023)
             )
             (i32.const 10)
            )
            (i32.and
             (call $~lib/string/String#charCodeAt
              (get_local $0)
              (get_local $2)
             )
             (i32.const 1023)
            )
           )
          )
         )
         (drop
          (call $~lib/array/Array<u8>#push
           (get_local $1)
           (i32.or
            (i32.const 240)
            (i32.shr_s
             (get_local $3)
             (i32.const 18)
            )
           )
          )
         )
         (drop
          (call $~lib/array/Array<u8>#push
           (get_local $1)
           (i32.or
            (i32.const 128)
            (i32.and
             (i32.shr_s
              (get_local $3)
              (i32.const 12)
             )
             (i32.const 63)
            )
           )
          )
         )
         (drop
          (call $~lib/array/Array<u8>#push
           (get_local $1)
           (i32.or
            (i32.const 128)
            (i32.and
             (i32.shr_s
              (get_local $3)
              (i32.const 6)
             )
             (i32.const 63)
            )
           )
          )
         )
         (drop
          (call $~lib/array/Array<u8>#push
           (get_local $1)
           (i32.or
            (i32.const 128)
            (i32.and
             (get_local $3)
             (i32.const 63)
            )
           )
          )
         )
        )
       )
      )
     )
    )
    (set_local $2
     (i32.add
      (get_local $2)
      (i32.const 1)
     )
    )
    (br $repeat|0)
   )
  )
  (drop
   (call $~lib/array/Array<u8>#push
    (get_local $1)
    (i32.const 0)
   )
  )
  (get_local $1)
 )
 (func $~lib/utf8util/string2cstr (; 29 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (set_local $1
   (call $~lib/utf8util/toUTF8Array
    (get_local $0)
   )
  )
  (set_local $2
   (i32.load
    (get_local $1)
   )
  )
  (i32.add
   (get_local $2)
   (i32.const 8)
  )
 )
 (func $~lib/env/ultrain_assert (; 30 ;) (type $iiv) (param $0 i32) (param $1 i32)
  (if
   (i32.eq
    (i32.and
     (get_local $0)
     (i32.const 1)
    )
    (i32.const 0)
   )
   (call $~lib/env/ultrainio_assert
    (i32.const 0)
    (call $~lib/utf8util/string2cstr
     (get_local $1)
    )
   )
  )
 )
 (func $~lib/ultrain-ts-lib/src/utils/toUTF8Array (; 31 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (set_local $1
   (call $~lib/array/Array<u8>#constructor
    (i32.const 0)
    (i32.const 0)
   )
  )
  (block $break|0
   (set_local $2
    (i32.const 0)
   )
   (loop $repeat|0
    (br_if $break|0
     (i32.eqz
      (i32.lt_s
       (get_local $2)
       (i32.load
        (get_local $0)
       )
      )
     )
    )
    (block
     (set_local $3
      (call $~lib/string/String#charCodeAt
       (get_local $0)
       (get_local $2)
      )
     )
     (if
      (i32.lt_s
       (get_local $3)
       (i32.const 128)
      )
      (drop
       (call $~lib/array/Array<u8>#push
        (get_local $1)
        (get_local $3)
       )
      )
      (if
       (i32.lt_s
        (get_local $3)
        (i32.const 2048)
       )
       (block
        (drop
         (call $~lib/array/Array<u8>#push
          (get_local $1)
          (i32.or
           (i32.const 192)
           (i32.shr_s
            (get_local $3)
            (i32.const 6)
           )
          )
         )
        )
        (drop
         (call $~lib/array/Array<u8>#push
          (get_local $1)
          (i32.or
           (i32.const 128)
           (i32.and
            (get_local $3)
            (i32.const 63)
           )
          )
         )
        )
       )
       (if
        (if (result i32)
         (tee_local $4
          (i32.lt_s
           (get_local $3)
           (i32.const 55296)
          )
         )
         (get_local $4)
         (i32.ge_s
          (get_local $3)
          (i32.const 57344)
         )
        )
        (block
         (drop
          (call $~lib/array/Array<u8>#push
           (get_local $1)
           (i32.or
            (i32.const 224)
            (i32.shr_s
             (get_local $3)
             (i32.const 12)
            )
           )
          )
         )
         (drop
          (call $~lib/array/Array<u8>#push
           (get_local $1)
           (i32.or
            (i32.const 128)
            (i32.and
             (i32.shr_s
              (get_local $3)
              (i32.const 6)
             )
             (i32.const 63)
            )
           )
          )
         )
         (drop
          (call $~lib/array/Array<u8>#push
           (get_local $1)
           (i32.or
            (i32.const 128)
            (i32.and
             (get_local $3)
             (i32.const 63)
            )
           )
          )
         )
        )
        (block
         (set_local $2
          (i32.add
           (get_local $2)
           (i32.const 1)
          )
         )
         (set_local $3
          (i32.add
           (i32.const 65536)
           (i32.or
            (i32.shl
             (i32.and
              (get_local $3)
              (i32.const 1023)
             )
             (i32.const 10)
            )
            (i32.and
             (call $~lib/string/String#charCodeAt
              (get_local $0)
              (get_local $2)
             )
             (i32.const 1023)
            )
           )
          )
         )
         (drop
          (call $~lib/array/Array<u8>#push
           (get_local $1)
           (i32.or
            (i32.const 240)
            (i32.shr_s
             (get_local $3)
             (i32.const 18)
            )
           )
          )
         )
         (drop
          (call $~lib/array/Array<u8>#push
           (get_local $1)
           (i32.or
            (i32.const 128)
            (i32.and
             (i32.shr_s
              (get_local $3)
              (i32.const 12)
             )
             (i32.const 63)
            )
           )
          )
         )
         (drop
          (call $~lib/array/Array<u8>#push
           (get_local $1)
           (i32.or
            (i32.const 128)
            (i32.and
             (i32.shr_s
              (get_local $3)
              (i32.const 6)
             )
             (i32.const 63)
            )
           )
          )
         )
         (drop
          (call $~lib/array/Array<u8>#push
           (get_local $1)
           (i32.or
            (i32.const 128)
            (i32.and
             (get_local $3)
             (i32.const 63)
            )
           )
          )
         )
        )
       )
      )
     )
    )
    (set_local $2
     (i32.add
      (get_local $2)
      (i32.const 1)
     )
    )
    (br $repeat|0)
   )
  )
  (drop
   (call $~lib/array/Array<u8>#push
    (get_local $1)
    (i32.const 0)
   )
  )
  (get_local $1)
 )
 (func $~lib/ultrain-ts-lib/src/utils/string2cstr (; 32 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (set_local $1
   (call $~lib/ultrain-ts-lib/src/utils/toUTF8Array
    (get_local $0)
   )
  )
  (set_local $2
   (i32.load
    (get_local $1)
   )
  )
  (i32.add
   (get_local $2)
   (i32.const 8)
  )
 )
 (func $~lib/ultrain-ts-lib/src/log/Logger#s (; 33 ;) (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (call $~lib/ultrain-ts-lib/src/log/env.ts_log_print_s
   (call $~lib/ultrain-ts-lib/src/utils/string2cstr
    (get_local $1)
   )
  )
  (get_local $0)
 )
 (func $~lib/ultrain-ts-lib/src/log/Logger#i (; 34 ;) (type $iIii) (param $0 i32) (param $1 i64) (param $2 i32) (result i32)
  (call $~lib/ultrain-ts-lib/src/log/env.ts_log_print_i
   (get_local $1)
   (get_local $2)
  )
  (get_local $0)
 )
 (func $~lib/ultrain-ts-lib/src/log/Logger#flush (; 35 ;) (type $iv) (param $0 i32)
  (call $~lib/ultrain-ts-lib/src/log/env.ts_log_done)
 )
 (func $~lib/ultrain-ts-lib/src/asset/StringToSymbol (; 36 ;) (type $iiI) (param $0 i32) (param $1 i32) (result i64)
  (local $2 i32)
  (local $3 i64)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (set_local $2
   (i32.load
    (get_local $1)
   )
  )
  (call $~lib/env/ultrain_assert
   (i32.le_u
    (i32.and
     (get_local $2)
     (i32.const 255)
    )
    (i32.const 7)
   )
   (i32.const 1296)
  )
  (set_local $3
   (i64.const 0)
  )
  (block $break|0
   (set_local $4
    (i32.const 0)
   )
   (loop $repeat|0
    (br_if $break|0
     (i32.eqz
      (i32.lt_u
       (get_local $4)
       (i32.and
        (get_local $2)
        (i32.const 255)
       )
      )
     )
    )
    (block
     (set_local $5
      (i32.and
       (call $~lib/string/String#charCodeAt
        (get_local $1)
        (i32.and
         (get_local $4)
         (i32.const 255)
        )
       )
       (i32.const 255)
      )
     )
     (if
      (if (result i32)
       (tee_local $6
        (i32.lt_u
         (get_local $5)
         (get_global $~lib/ultrain-ts-lib/src/asset/CHAR_A)
        )
       )
       (get_local $6)
       (i32.gt_u
        (get_local $5)
        (get_global $~lib/ultrain-ts-lib/src/asset/CHAR_Z)
       )
      )
      (call $~lib/ultrain-ts-lib/src/log/Logger#flush
       (call $~lib/ultrain-ts-lib/src/log/Logger#i
        (call $~lib/ultrain-ts-lib/src/log/Logger#s
         (get_global $~lib/ultrain-ts-lib/src/log/Log)
         (i32.const 1520)
        )
        (i64.extend_s/i32
         (get_local $5)
        )
        (i32.const 16)
       )
      )
      (set_local $3
       (i64.or
        (get_local $3)
        (i64.shl
         (i64.extend_u/i32
          (get_local $5)
         )
         (i64.mul
          (i64.const 8)
          (i64.extend_u/i32
           (i32.and
            (i32.add
             (get_local $4)
             (i32.const 1)
            )
            (i32.const 255)
           )
          )
         )
        )
       )
      )
     )
    )
    (set_local $4
     (i32.add
      (get_local $4)
      (i32.const 1)
     )
    )
    (br $repeat|0)
   )
  )
  (set_local $3
   (i64.or
    (get_local $3)
    (i64.extend_u/i32
     (i32.and
      (get_local $0)
      (i32.const 255)
     )
    )
   )
  )
  (get_local $3)
 )
 (func $~lib/ultrain-ts-lib/src/contract/Contract#get:receiver (; 37 ;) (type $iI) (param $0 i32) (result i64)
  (i64.load
   (get_local $0)
  )
 )
 (func $~lib/ultrain-ts-lib/lib/name_ex/NameEx#constructor (; 38 ;) (type $iIIi) (param $0 i32) (param $1 i64) (param $2 i64) (result i32)
  (local $3 i32)
  (i64.store
   (tee_local $0
    (if (result i32)
     (get_local $0)
     (get_local $0)
     (tee_local $0
      (block (result i32)
       (set_local $3
        (call $~lib/memory/memory.allocate
         (i32.const 16)
        )
       )
       (i64.store
        (get_local $3)
        (i64.const 0)
       )
       (i64.store offset=8
        (get_local $3)
        (i64.const 0)
       )
       (get_local $3)
      )
     )
    )
   )
   (get_local $1)
  )
  (i64.store offset=8
   (get_local $0)
   (get_local $2)
  )
  (get_local $0)
 )
 (func $~lib/ultrain-ts-lib/src/contract/Contract#setActionName (; 39 ;) (type $iIIv) (param $0 i32) (param $1 i64) (param $2 i64)
  (i32.store offset=8
   (get_local $0)
   (call $~lib/ultrain-ts-lib/lib/name_ex/NameEx#constructor
    (i32.const 0)
    (get_local $1)
    (get_local $2)
   )
  )
 )
 (func $~lib/ultrain-ts-lib/lib/name_ex/char_to_symbol_ex (; 40 ;) (type $iI) (param $0 i32) (result i64)
  (local $1 i32)
  (if
   (i32.eq
    (i32.and
     (get_local $0)
     (i32.const 255)
    )
    (i32.const 46)
   )
   (return
    (i64.const 0)
   )
  )
  (if
   (i32.eq
    (i32.and
     (get_local $0)
     (i32.const 255)
    )
    (i32.const 95)
   )
   (return
    (i64.const 1)
   )
  )
  (if
   (if (result i32)
    (tee_local $1
     (i32.ge_u
      (i32.and
       (get_local $0)
       (i32.const 255)
      )
      (i32.const 48)
     )
    )
    (i32.le_u
     (i32.and
      (get_local $0)
      (i32.const 255)
     )
     (i32.const 57)
    )
    (get_local $1)
   )
   (return
    (i64.extend_u/i32
     (i32.and
      (i32.add
       (i32.sub
        (get_local $0)
        (i32.const 48)
       )
       (i32.const 2)
      )
      (i32.const 255)
     )
    )
   )
  )
  (if
   (if (result i32)
    (tee_local $1
     (i32.ge_u
      (i32.and
       (get_local $0)
       (i32.const 255)
      )
      (i32.const 97)
     )
    )
    (i32.le_u
     (i32.and
      (get_local $0)
      (i32.const 255)
     )
     (i32.const 122)
    )
    (get_local $1)
   )
   (return
    (i64.extend_u/i32
     (i32.and
      (i32.add
       (i32.sub
        (get_local $0)
        (i32.const 97)
       )
       (i32.const 12)
      )
      (i32.const 255)
     )
    )
   )
  )
  (if
   (if (result i32)
    (tee_local $1
     (i32.ge_u
      (i32.and
       (get_local $0)
       (i32.const 255)
      )
      (i32.const 65)
     )
    )
    (i32.le_u
     (i32.and
      (get_local $0)
      (i32.const 255)
     )
     (i32.const 90)
    )
    (get_local $1)
   )
   (return
    (i64.extend_u/i32
     (i32.and
      (i32.add
       (i32.sub
        (get_local $0)
        (i32.const 65)
       )
       (i32.const 38)
      )
      (i32.const 255)
     )
    )
   )
  )
  (i64.const 255)
 )
 (func $~lib/ultrain-ts-lib/lib/name_ex/NEX (; 41 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i64)
  (local $3 i32)
  (local $4 i32)
  (local $5 i64)
  (local $6 i64)
  (local $7 i64)
  (set_local $1
   (call $~lib/ultrain-ts-lib/lib/name_ex/NameEx#constructor
    (i32.const 0)
    (i64.const 0)
    (i64.const 0)
   )
  )
  (set_local $2
   (i64.const 0)
  )
  (set_local $3
   (i32.load
    (get_local $0)
   )
  )
  (block $break|0
   (set_local $4
    (i32.const 0)
   )
   (loop $repeat|0
    (br_if $break|0
     (i32.eqz
      (i32.lt_s
       (get_local $4)
       (get_local $3)
      )
     )
    )
    (block
     (set_local $5
      (call $~lib/ultrain-ts-lib/lib/name_ex/char_to_symbol_ex
       (call $~lib/string/String#charCodeAt
        (get_local $0)
        (get_local $4)
       )
      )
     )
     (if
      (i32.le_s
       (get_local $4)
       (i32.const 9)
      )
      (set_local $2
       (i64.or
        (get_local $2)
        (i64.shl
         (get_local $5)
         (i64.mul
          (i64.const 6)
          (i64.extend_u/i32
           (get_local $4)
          )
         )
        )
       )
      )
      (if
       (i32.eq
        (get_local $4)
        (i32.const 10)
       )
       (block
        (set_local $6
         (i64.and
          (get_local $5)
          (i64.const 15)
         )
        )
        (set_local $2
         (i64.or
          (get_local $2)
          (i64.shl
           (get_local $6)
           (i64.mul
            (i64.const 6)
            (i64.extend_u/i32
             (get_local $4)
            )
           )
          )
         )
        )
        (i64.store offset=8
         (get_local $1)
         (get_local $2)
        )
        (set_local $7
         (i64.shr_u
          (i64.and
           (get_local $5)
           (i64.const 48)
          )
          (i64.const 4)
         )
        )
        (set_local $2
         (get_local $7)
        )
       )
       (set_local $2
        (i64.or
         (get_local $2)
         (i64.shl
          (get_local $5)
          (i64.add
           (i64.mul
            (i64.const 6)
            (i64.extend_u/i32
             (i32.sub
              (get_local $4)
              (i32.const 11)
             )
            )
           )
           (i64.const 2)
          )
         )
        )
       )
      )
     )
     (if
      (i32.le_s
       (get_local $3)
       (i32.const 10)
      )
      (i64.store offset=8
       (get_local $1)
       (get_local $2)
      )
      (i64.store
       (get_local $1)
       (get_local $2)
      )
     )
    )
    (set_local $4
     (i32.add
      (get_local $4)
      (i32.const 1)
     )
    )
    (br $repeat|0)
   )
  )
  (get_local $1)
 )
 (func $~lib/ultrain-ts-lib/lib/name_ex/NameEx._eq (; 42 ;) (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (if (result i32)
   (tee_local $2
    (i64.eq
     (i64.load
      (get_local $0)
     )
     (i64.load
      (get_local $1)
     )
    )
   )
   (i64.eq
    (i64.load offset=8
     (get_local $0)
    )
    (i64.load offset=8
     (get_local $1)
    )
   )
   (get_local $2)
  )
 )
 (func $~lib/ultrain-ts-lib/src/contract/Contract#isAction (; 43 ;) (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (call $~lib/ultrain-ts-lib/lib/name_ex/NameEx._eq
   (i32.load offset=8
    (get_local $0)
   )
   (call $~lib/ultrain-ts-lib/lib/name_ex/NEX
    (get_local $1)
   )
  )
 )
 (func $~lib/internal/typedarray/TypedArray<u8_u32>#constructor (; 44 ;) (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (if
   (i32.gt_u
    (get_local $1)
    (i32.const 1073741816)
   )
   (block
    (call $~lib/env/abort)
    (unreachable)
   )
  )
  (set_local $2
   (i32.shl
    (get_local $1)
    (i32.const 0)
   )
  )
  (set_local $3
   (call $~lib/internal/arraybuffer/allocateUnsafe
    (get_local $2)
   )
  )
  (block $~lib/memory/memory.fill|inlined.3
   (set_local $4
    (i32.add
     (get_local $3)
     (get_global $~lib/internal/arraybuffer/HEADER_SIZE)
    )
   )
   (set_local $5
    (i32.const 0)
   )
   (call $~lib/internal/memory/memset
    (get_local $4)
    (get_local $5)
    (get_local $2)
   )
  )
  (i32.store
   (tee_local $0
    (if (result i32)
     (get_local $0)
     (get_local $0)
     (tee_local $0
      (block (result i32)
       (set_local $5
        (call $~lib/memory/memory.allocate
         (i32.const 12)
        )
       )
       (i32.store
        (get_local $5)
        (i32.const 0)
       )
       (i32.store offset=4
        (get_local $5)
        (i32.const 0)
       )
       (i32.store offset=8
        (get_local $5)
        (i32.const 0)
       )
       (get_local $5)
      )
     )
    )
   )
   (get_local $3)
  )
  (i32.store offset=4
   (get_local $0)
   (i32.const 0)
  )
  (i32.store offset=8
   (get_local $0)
   (get_local $2)
  )
  (get_local $0)
 )
 (func $~lib/datastream/DataStream#constructor (; 45 ;) (type $iiii) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (i32.store
   (tee_local $0
    (if (result i32)
     (get_local $0)
     (get_local $0)
     (tee_local $0
      (block (result i32)
       (set_local $3
        (call $~lib/memory/memory.allocate
         (i32.const 12)
        )
       )
       (i32.store
        (get_local $3)
        (i32.const 0)
       )
       (i32.store offset=4
        (get_local $3)
        (i32.const 0)
       )
       (i32.store offset=8
        (get_local $3)
        (i32.const 0)
       )
       (get_local $3)
      )
     )
    )
   )
   (get_local $1)
  )
  (i32.store offset=4
   (get_local $0)
   (get_local $2)
  )
  (i32.store offset=8
   (get_local $0)
   (i32.const 0)
  )
  (get_local $0)
 )
 (func $~lib/ultrain-ts-lib/src/contract/DataStreamFromCurrentAction (; 46 ;) (type $i) (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (set_local $0
   (call $~lib/ultrain-ts-lib/internal/action.d/env.action_data_size)
  )
  (set_local $1
   (call $~lib/internal/typedarray/TypedArray<u8_u32>#constructor
    (i32.const 0)
    (get_local $0)
   )
  )
  (drop
   (call $~lib/ultrain-ts-lib/internal/action.d/env.read_action_data
    (i32.load
     (get_local $1)
    )
    (get_local $0)
   )
  )
  (set_local $2
   (call $~lib/datastream/DataStream#constructor
    (i32.const 0)
    (i32.load
     (get_local $1)
    )
    (get_local $0)
   )
  )
  (get_local $2)
 )
 (func $~lib/ultrain-ts-lib/src/contract/Contract#getDataStream (; 47 ;) (type $ii) (param $0 i32) (result i32)
  (call $~lib/ultrain-ts-lib/src/contract/DataStreamFromCurrentAction)
 )
 (func $~lib/ultrain-ts-lib/src/contract/Contract#onInit (; 48 ;) (type $iv) (param $0 i32)
  (nop)
 )
 (func $~lib/ultrain-ts-lib/src/contract/Contract#onStop (; 49 ;) (type $iv) (param $0 i32)
  (nop)
 )
 (func $~lib/ultrain-ts-lib/src/asset/Asset#symbolName (; 50 ;) (type $iI) (param $0 i32) (result i64)
  (i64.shr_u
   (i64.load offset=8
    (get_local $0)
   )
   (i64.const 8)
  )
 )
 (func $~lib/ultrain-ts-lib/src/asset/Asset#isSymbolValid (; 51 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i64)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (set_local $1
   (i64.load offset=8
    (get_local $0)
   )
  )
  (set_local $1
   (i64.shr_u
    (get_local $1)
    (i64.const 8)
   )
  )
  (block $break|0
   (set_local $2
    (i32.const 0)
   )
   (loop $repeat|0
    (br_if $break|0
     (i32.eqz
      (i32.lt_s
       (get_local $2)
       (i32.const 7)
      )
     )
    )
    (block
     (set_local $3
      (i32.wrap/i64
       (i64.and
        (get_local $1)
        (i64.const 255)
       )
      )
     )
     (if
      (if (result i32)
       (tee_local $4
        (i32.lt_u
         (i32.and
          (get_local $3)
          (i32.const 255)
         )
         (get_global $~lib/ultrain-ts-lib/src/asset/CHAR_A)
        )
       )
       (get_local $4)
       (i32.gt_u
        (i32.and
         (get_local $3)
         (i32.const 255)
        )
        (get_global $~lib/ultrain-ts-lib/src/asset/CHAR_Z)
       )
      )
      (return
       (i32.const 0)
      )
     )
     (set_local $1
      (i64.shr_u
       (get_local $1)
       (i64.const 8)
      )
     )
     (if
      (i64.eq
       (i64.and
        (get_local $1)
        (i64.const 255)
       )
       (i64.const 0)
      )
      (block $break|1
       (loop $continue|1
        (block
         (set_local $1
          (i64.shr_u
           (get_local $1)
           (i64.const 8)
          )
         )
         (if
          (i64.ne
           (i64.and
            (get_local $1)
            (i64.const 255)
           )
           (i64.const 0)
          )
          (return
           (i32.const 0)
          )
         )
         (set_local $2
          (i32.add
           (get_local $2)
           (i32.const 1)
          )
         )
        )
        (br_if $continue|1
         (i32.lt_s
          (get_local $2)
          (i32.const 7)
         )
        )
       )
      )
     )
    )
    (set_local $2
     (i32.add
      (get_local $2)
      (i32.const 1)
     )
    )
    (br $repeat|0)
   )
  )
  (i32.const 1)
 )
 (func $~lib/ultrain-ts-lib/src/asset/Asset#isAmountWithinRange (; 52 ;) (type $iIi) (param $0 i32) (param $1 i64) (result i32)
  (local $2 i32)
  (if (result i32)
   (tee_local $2
    (i64.le_u
     (i64.extend_u/i32
      (i32.const 0)
     )
     (get_local $1)
    )
   )
   (i64.le_u
    (get_local $1)
    (get_global $~lib/ultrain-ts-lib/src/asset/MAX_AMOUNT)
   )
   (get_local $2)
  )
 )
 (func $~lib/ultrain-ts-lib/src/asset/Asset#isValid (; 53 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (if (result i32)
   (tee_local $1
    (call $~lib/ultrain-ts-lib/src/asset/Asset#isAmountWithinRange
     (get_local $0)
     (i64.load
      (get_local $0)
     )
    )
   )
   (call $~lib/ultrain-ts-lib/src/asset/Asset#isSymbolValid
    (get_local $0)
   )
   (get_local $1)
  )
 )
 (func $~lib/ultrain-ts-lib/lib/name/char_to_symbol (; 54 ;) (type $iI) (param $0 i32) (result i64)
  (local $1 i32)
  (if
   (if (result i32)
    (tee_local $1
     (i32.ge_u
      (i32.and
       (get_local $0)
       (i32.const 255)
      )
      (i32.const 97)
     )
    )
    (i32.le_u
     (i32.and
      (get_local $0)
      (i32.const 255)
     )
     (i32.const 122)
    )
    (get_local $1)
   )
   (return
    (i64.extend_u/i32
     (i32.and
      (i32.add
       (i32.sub
        (get_local $0)
        (i32.const 97)
       )
       (i32.const 6)
      )
      (i32.const 255)
     )
    )
   )
  )
  (if
   (if (result i32)
    (tee_local $1
     (i32.ge_u
      (i32.and
       (get_local $0)
       (i32.const 255)
      )
      (i32.const 49)
     )
    )
    (i32.le_u
     (i32.and
      (get_local $0)
      (i32.const 255)
     )
     (i32.const 53)
    )
    (get_local $1)
   )
   (return
    (i64.extend_u/i32
     (i32.and
      (i32.add
       (i32.sub
        (get_local $0)
        (i32.const 49)
       )
       (i32.const 1)
      )
      (i32.const 255)
     )
    )
   )
  )
  (i64.const 0)
 )
 (func $~lib/ultrain-ts-lib/lib/name/N (; 55 ;) (type $iI) (param $0 i32) (result i64)
  (local $1 i32)
  (local $2 i64)
  (local $3 i32)
  (local $4 i64)
  (local $5 i32)
  (set_local $1
   (i32.load
    (get_local $0)
   )
  )
  (set_local $2
   (i64.const 0)
  )
  (block $break|0
   (set_local $3
    (i32.const 0)
   )
   (loop $repeat|0
    (br_if $break|0
     (i32.eqz
      (i32.le_u
       (get_local $3)
       (i32.const 12)
      )
     )
    )
    (block
     (set_local $4
      (i64.const 0)
     )
     (if
      (if (result i32)
       (tee_local $5
        (i32.lt_u
         (get_local $3)
         (get_local $1)
        )
       )
       (i32.le_u
        (get_local $3)
        (i32.const 12)
       )
       (get_local $5)
      )
      (set_local $4
       (call $~lib/ultrain-ts-lib/lib/name/char_to_symbol
        (i32.and
         (call $~lib/string/String#charCodeAt
          (get_local $0)
          (get_local $3)
         )
         (i32.const 255)
        )
       )
      )
     )
     (if
      (i32.lt_u
       (get_local $3)
       (i32.const 12)
      )
      (block
       (set_local $4
        (i64.and
         (get_local $4)
         (i64.const 31)
        )
       )
       (set_local $4
        (i64.shl
         (get_local $4)
         (i64.sub
          (i64.const 64)
          (i64.mul
           (i64.const 5)
           (i64.extend_u/i32
            (i32.add
             (get_local $3)
             (i32.const 1)
            )
           )
          )
         )
        )
       )
      )
      (set_local $4
       (i64.and
        (get_local $4)
        (i64.const 15)
       )
      )
     )
     (set_local $2
      (i64.or
       (get_local $2)
       (get_local $4)
      )
     )
    )
    (set_local $3
     (i32.add
      (get_local $3)
      (i32.const 1)
     )
    )
    (br $repeat|0)
   )
  )
  (get_local $2)
 )
 (func $~lib/ultrain-ts-lib/src/account/NAME (; 56 ;) (type $iI) (param $0 i32) (result i64)
  (call $~lib/ultrain-ts-lib/lib/name/N
   (get_local $0)
  )
 )
 (func $~lib/dbmanager/DBManager<CurrencyStats>#constructor (; 57 ;) (type $iIIIi) (param $0 i32) (param $1 i64) (param $2 i64) (param $3 i64) (result i32)
  (local $4 i32)
  (i64.store
   (tee_local $0
    (if (result i32)
     (get_local $0)
     (get_local $0)
     (tee_local $0
      (block (result i32)
       (set_local $4
        (call $~lib/memory/memory.allocate
         (i32.const 24)
        )
       )
       (i64.store
        (get_local $4)
        (i64.const 0)
       )
       (i64.store offset=8
        (get_local $4)
        (i64.const 0)
       )
       (i64.store offset=16
        (get_local $4)
        (i64.const 0)
       )
       (get_local $4)
      )
     )
    )
   )
   (get_local $1)
  )
  (i64.store offset=8
   (get_local $0)
   (get_local $2)
  )
  (i64.store offset=16
   (get_local $0)
   (get_local $3)
  )
  (get_local $0)
 )
 (func $~lib/ultrain-ts-lib/src/asset/Asset#constructor (; 58 ;) (type $iIIi) (param $0 i32) (param $1 i64) (param $2 i64) (result i32)
  (local $3 i32)
  (i64.store
   (tee_local $0
    (if (result i32)
     (get_local $0)
     (get_local $0)
     (tee_local $0
      (block (result i32)
       (set_local $3
        (call $~lib/memory/memory.allocate
         (i32.const 16)
        )
       )
       (i64.store
        (get_local $3)
        (i64.const 0)
       )
       (i64.store offset=8
        (get_local $3)
        (i64.const 0)
       )
       (get_local $3)
      )
     )
    )
   )
   (get_local $1)
  )
  (i64.store offset=8
   (get_local $0)
   (get_local $2)
  )
  (get_local $0)
 )
 (func $~lib/ultrain-ts-lib/lib/balance/CurrencyStats#constructor (; 59 ;) (type $iiiIIi) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i64) (param $4 i64) (result i32)
  (local $5 i32)
  (i32.store offset=4
   (tee_local $0
    (if (result i32)
     (get_local $0)
     (get_local $0)
     (tee_local $0
      (block (result i32)
       (set_local $5
        (call $~lib/memory/memory.allocate
         (i32.const 24)
        )
       )
       (i32.store
        (get_local $5)
        (i32.const 0)
       )
       (i32.store offset=4
        (get_local $5)
        (i32.const 0)
       )
       (i64.store offset=8
        (get_local $5)
        (i64.const 0)
       )
       (i64.store offset=16
        (get_local $5)
        (i64.const 0)
       )
       (get_local $5)
      )
     )
    )
   )
   (get_local $2)
  )
  (i32.store
   (get_local $0)
   (get_local $1)
  )
  (i64.store offset=8
   (get_local $0)
   (get_local $3)
  )
  (i64.store offset=16
   (get_local $0)
   (get_local $4)
  )
  (get_local $0)
 )
 (func $~lib/datastream/DataStream#read<u64> (; 60 ;) (type $iI) (param $0 i32) (result i64)
  (local $1 i64)
  (set_local $1
   (i64.load
    (i32.add
     (i32.load
      (get_local $0)
     )
     (i32.load offset=8
      (get_local $0)
     )
    )
   )
  )
  (i32.store offset=8
   (get_local $0)
   (i32.add
    (i32.load offset=8
     (get_local $0)
    )
    (i32.const 8)
   )
  )
  (get_local $1)
 )
 (func $~lib/ultrain-ts-lib/src/asset/Asset#deserialize (; 61 ;) (type $iiv) (param $0 i32) (param $1 i32)
  (i64.store
   (get_local $0)
   (call $~lib/datastream/DataStream#read<u64>
    (get_local $1)
   )
  )
  (i64.store offset=8
   (get_local $0)
   (call $~lib/datastream/DataStream#read<u64>
    (get_local $1)
   )
  )
 )
 (func $~lib/ultrain-ts-lib/lib/balance/CurrencyStats#deserialize (; 62 ;) (type $iiv) (param $0 i32) (param $1 i32)
  (call $~lib/ultrain-ts-lib/src/asset/Asset#deserialize
   (i32.load
    (get_local $0)
   )
   (get_local $1)
  )
  (call $~lib/ultrain-ts-lib/src/asset/Asset#deserialize
   (i32.load offset=4
    (get_local $0)
   )
   (get_local $1)
  )
  (i64.store offset=8
   (get_local $0)
   (call $~lib/datastream/DataStream#read<u64>
    (get_local $1)
   )
  )
  (i64.store offset=16
   (get_local $0)
   (call $~lib/datastream/DataStream#read<u64>
    (get_local $1)
   )
  )
 )
 (func $~lib/dbmanager/DBManager<CurrencyStats>#loadObjectByPrimaryIterator (; 63 ;) (type $iiiv) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (set_local $3
   (call $~lib/env/db_get_i64
    (get_local $1)
    (i32.const 0)
    (i32.const 0)
   )
  )
  (set_local $4
   (call $~lib/internal/typedarray/TypedArray<u8_u32>#constructor
    (i32.const 0)
    (get_local $3)
   )
  )
  (set_local $5
   (call $~lib/datastream/DataStream#constructor
    (i32.const 0)
    (i32.load
     (get_local $4)
    )
    (get_local $3)
   )
  )
  (drop
   (call $~lib/env/db_get_i64
    (get_local $1)
    (i32.load
     (get_local $4)
    )
    (get_local $3)
   )
  )
  (call $~lib/ultrain-ts-lib/lib/balance/CurrencyStats#deserialize
   (get_local $2)
   (get_local $5)
  )
 )
 (func $~lib/dbmanager/DBManager<CurrencyStats>#get (; 64 ;) (type $iIii) (param $0 i32) (param $1 i64) (param $2 i32) (result i32)
  (local $3 i32)
  (set_local $3
   (call $~lib/env/db_find_i64
    (i64.load offset=8
     (get_local $0)
    )
    (i64.load offset=16
     (get_local $0)
    )
    (i64.load
     (get_local $0)
    )
    (get_local $1)
   )
  )
  (if
   (i32.lt_s
    (get_local $3)
    (i32.const 0)
   )
   (return
    (i32.const 0)
   )
  )
  (call $~lib/dbmanager/DBManager<CurrencyStats>#loadObjectByPrimaryIterator
   (get_local $0)
   (get_local $3)
   (get_local $2)
  )
  (i32.const 1)
 )
 (func $~lib/ultrain-ts-lib/src/asset/Asset#getSymbol (; 65 ;) (type $iI) (param $0 i32) (result i64)
  (i64.load offset=8
   (get_local $0)
  )
 )
 (func $~lib/ultrain-ts-lib/src/asset/Asset#setSymbol (; 66 ;) (type $iIv) (param $0 i32) (param $1 i64)
  (i64.store offset=8
   (get_local $0)
   (get_local $1)
  )
 )
 (func $~lib/datastream/DataStream#isMeasureMode (; 67 ;) (type $ii) (param $0 i32) (result i32)
  (i32.eq
   (i32.load
    (get_local $0)
   )
   (i32.const 0)
  )
 )
 (func $~lib/datastream/DataStream#write<u64> (; 68 ;) (type $iIv) (param $0 i32) (param $1 i64)
  (if
   (i32.eqz
    (call $~lib/datastream/DataStream#isMeasureMode
     (get_local $0)
    )
   )
   (i64.store
    (i32.add
     (i32.load
      (get_local $0)
     )
     (i32.load offset=8
      (get_local $0)
     )
    )
    (get_local $1)
   )
  )
  (i32.store offset=8
   (get_local $0)
   (i32.add
    (i32.load offset=8
     (get_local $0)
    )
    (i32.const 8)
   )
  )
 )
 (func $~lib/ultrain-ts-lib/src/asset/Asset#serialize (; 69 ;) (type $iiv) (param $0 i32) (param $1 i32)
  (call $~lib/datastream/DataStream#write<u64>
   (get_local $1)
   (i64.load
    (get_local $0)
   )
  )
  (call $~lib/datastream/DataStream#write<u64>
   (get_local $1)
   (i64.load offset=8
    (get_local $0)
   )
  )
 )
 (func $~lib/ultrain-ts-lib/lib/balance/CurrencyStats#serialize (; 70 ;) (type $iiv) (param $0 i32) (param $1 i32)
  (call $~lib/ultrain-ts-lib/src/asset/Asset#serialize
   (i32.load
    (get_local $0)
   )
   (get_local $1)
  )
  (call $~lib/ultrain-ts-lib/src/asset/Asset#serialize
   (i32.load offset=4
    (get_local $0)
   )
   (get_local $1)
  )
  (call $~lib/datastream/DataStream#write<u64>
   (get_local $1)
   (i64.load offset=8
    (get_local $0)
   )
  )
  (call $~lib/datastream/DataStream#write<u64>
   (get_local $1)
   (i64.load offset=16
    (get_local $0)
   )
  )
 )
 (func $~lib/datastream/DataStream.measure<CurrencyStats> (; 71 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (set_local $1
   (call $~lib/datastream/DataStream#constructor
    (i32.const 0)
    (i32.const 0)
    (i32.const 0)
   )
  )
  (call $~lib/ultrain-ts-lib/lib/balance/CurrencyStats#serialize
   (get_local $0)
   (get_local $1)
  )
  (i32.load offset=8
   (get_local $1)
  )
 )
 (func $~lib/ultrain-ts-lib/lib/balance/CurrencyStats#primaryKey (; 72 ;) (type $iI) (param $0 i32) (result i64)
  (call $~lib/ultrain-ts-lib/src/asset/Asset#symbolName
   (i32.load
    (get_local $0)
   )
  )
 )
 (func $~lib/dbmanager/DBManager<CurrencyStats>#emplace (; 73 ;) (type $iIiv) (param $0 i32) (param $1 i64) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i64)
  (call $~lib/env/ultrain_assert
   (i64.eq
    (i64.load offset=8
     (get_local $0)
    )
    (call $~lib/env/current_receiver)
   )
   (i32.const 1936)
  )
  (set_local $3
   (call $~lib/datastream/DataStream.measure<CurrencyStats>
    (get_local $2)
   )
  )
  (set_local $4
   (call $~lib/internal/typedarray/TypedArray<u8_u32>#constructor
    (i32.const 0)
    (get_local $3)
   )
  )
  (set_local $5
   (call $~lib/datastream/DataStream#constructor
    (i32.const 0)
    (i32.load
     (get_local $4)
    )
    (get_local $3)
   )
  )
  (call $~lib/ultrain-ts-lib/lib/balance/CurrencyStats#serialize
   (get_local $2)
   (get_local $5)
  )
  (set_local $6
   (call $~lib/ultrain-ts-lib/lib/balance/CurrencyStats#primaryKey
    (get_local $2)
   )
  )
  (drop
   (call $~lib/env/db_store_i64
    (i64.load offset=16
     (get_local $0)
    )
    (i64.load
     (get_local $0)
    )
    (get_local $1)
    (get_local $6)
    (i32.load
     (get_local $5)
    )
    (i32.load offset=8
     (get_local $5)
    )
   )
  )
 )
 (func $contract/token/MyContract#create (; 74 ;) (type $iIiv) (param $0 i32) (param $1 i64) (param $2 i32)
  (local $3 i64)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (call $~lib/ultrain-ts-lib/internal/action.d/env.require_auth
   (call $~lib/ultrain-ts-lib/src/contract/Contract#get:receiver
    (get_local $0)
   )
  )
  (set_local $3
   (call $~lib/ultrain-ts-lib/src/asset/Asset#symbolName
    (get_local $2)
   )
  )
  (call $~lib/env/ultrain_assert
   (call $~lib/ultrain-ts-lib/src/asset/Asset#isSymbolValid
    (get_local $2)
   )
   (i32.const 1728)
  )
  (call $~lib/env/ultrain_assert
   (call $~lib/ultrain-ts-lib/src/asset/Asset#isValid
    (get_local $2)
   )
   (i32.const 1800)
  )
  (set_local $4
   (call $~lib/dbmanager/DBManager<CurrencyStats>#constructor
    (i32.const 0)
    (call $~lib/ultrain-ts-lib/src/account/NAME
     (get_global $contract/token/STATSTABLE)
    )
    (call $~lib/ultrain-ts-lib/src/contract/Contract#get:receiver
     (get_local $0)
    )
    (get_local $3)
   )
  )
  (set_local $5
   (call $~lib/ultrain-ts-lib/lib/balance/CurrencyStats#constructor
    (i32.const 0)
    (call $~lib/ultrain-ts-lib/src/asset/Asset#constructor
     (i32.const 0)
     (i64.const 0)
     (i64.const 357577479428)
    )
    (call $~lib/ultrain-ts-lib/src/asset/Asset#constructor
     (i32.const 0)
     (i64.const 0)
     (i64.const 357577479428)
    )
    (i64.const 0)
    (i64.const 0)
   )
  )
  (set_local $6
   (call $~lib/dbmanager/DBManager<CurrencyStats>#get
    (get_local $4)
    (get_local $3)
    (get_local $5)
   )
  )
  (call $~lib/env/ultrain_assert
   (i32.eqz
    (get_local $6)
   )
   (i32.const 1864)
  )
  (call $~lib/ultrain-ts-lib/src/asset/Asset#setSymbol
   (i32.load
    (get_local $5)
   )
   (call $~lib/ultrain-ts-lib/src/asset/Asset#getSymbol
    (get_local $2)
   )
  )
  (i32.store offset=4
   (get_local $5)
   (get_local $2)
  )
  (i64.store offset=8
   (get_local $5)
   (get_local $1)
  )
  (call $~lib/dbmanager/DBManager<CurrencyStats>#emplace
   (get_local $4)
   (call $~lib/ultrain-ts-lib/src/contract/Contract#get:receiver
    (get_local $0)
   )
   (get_local $5)
  )
 )
 (func $~lib/ultrain-ts-lib/src/asset/Asset#getAmount (; 75 ;) (type $iI) (param $0 i32) (result i64)
  (i64.load
   (get_local $0)
  )
 )
 (func $~lib/ultrain-ts-lib/src/asset/Asset#setAmount (; 76 ;) (type $iIv) (param $0 i32) (param $1 i64)
  (if
   (call $~lib/ultrain-ts-lib/src/asset/Asset#isAmountWithinRange
    (get_local $0)
    (get_local $1)
   )
   (i64.store
    (get_local $0)
    (get_local $1)
   )
  )
 )
 (func $~lib/dbmanager/DBManager<CurrencyStats>#find (; 77 ;) (type $iIi) (param $0 i32) (param $1 i64) (result i32)
  (local $2 i32)
  (set_local $2
   (call $~lib/env/db_find_i64
    (i64.load offset=8
     (get_local $0)
    )
    (i64.load offset=16
     (get_local $0)
    )
    (i64.load
     (get_local $0)
    )
    (get_local $1)
   )
  )
  (get_local $2)
 )
 (func $~lib/dbmanager/DBManager<CurrencyStats>#modify (; 78 ;) (type $iIiv) (param $0 i32) (param $1 i64) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (set_local $3
   (call $~lib/dbmanager/DBManager<CurrencyStats>#find
    (get_local $0)
    (call $~lib/ultrain-ts-lib/lib/balance/CurrencyStats#primaryKey
     (get_local $2)
    )
   )
  )
  (call $~lib/env/ultrain_assert
   (i32.ge_s
    (get_local $3)
    (i32.const 0)
   )
   (i32.const 2544)
  )
  (call $~lib/env/ultrain_assert
   (i64.eq
    (i64.load offset=8
     (get_local $0)
    )
    (call $~lib/env/current_receiver)
   )
   (i32.const 2664)
  )
  (set_local $4
   (call $~lib/datastream/DataStream.measure<CurrencyStats>
    (get_local $2)
   )
  )
  (set_local $5
   (call $~lib/internal/typedarray/TypedArray<u8_u32>#constructor
    (i32.const 0)
    (get_local $4)
   )
  )
  (set_local $6
   (call $~lib/datastream/DataStream#constructor
    (i32.const 0)
    (i32.load
     (get_local $5)
    )
    (get_local $4)
   )
  )
  (call $~lib/ultrain-ts-lib/lib/balance/CurrencyStats#serialize
   (get_local $2)
   (get_local $6)
  )
  (call $~lib/env/db_update_i64
   (get_local $3)
   (get_local $1)
   (i32.load
    (get_local $6)
   )
   (i32.load offset=8
    (get_local $6)
   )
  )
 )
 (func $~lib/dbmanager/DBManager<CurrencyAccount>#constructor (; 79 ;) (type $iIIIi) (param $0 i32) (param $1 i64) (param $2 i64) (param $3 i64) (result i32)
  (local $4 i32)
  (i64.store
   (tee_local $0
    (if (result i32)
     (get_local $0)
     (get_local $0)
     (tee_local $0
      (block (result i32)
       (set_local $4
        (call $~lib/memory/memory.allocate
         (i32.const 24)
        )
       )
       (i64.store
        (get_local $4)
        (i64.const 0)
       )
       (i64.store offset=8
        (get_local $4)
        (i64.const 0)
       )
       (i64.store offset=16
        (get_local $4)
        (i64.const 0)
       )
       (get_local $4)
      )
     )
    )
   )
   (get_local $1)
  )
  (i64.store offset=8
   (get_local $0)
   (get_local $2)
  )
  (i64.store offset=16
   (get_local $0)
   (get_local $3)
  )
  (get_local $0)
 )
 (func $~lib/ultrain-ts-lib/lib/balance/CurrencyAccount#constructor (; 80 ;) (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (i32.store
   (tee_local $0
    (if (result i32)
     (get_local $0)
     (get_local $0)
     (tee_local $0
      (block (result i32)
       (set_local $2
        (call $~lib/memory/memory.allocate
         (i32.const 4)
        )
       )
       (i32.store
        (get_local $2)
        (i32.const 0)
       )
       (get_local $2)
      )
     )
    )
   )
   (get_local $1)
  )
  (get_local $0)
 )
 (func $~lib/ultrain-ts-lib/lib/balance/CurrencyAccount#deserialize (; 81 ;) (type $iiv) (param $0 i32) (param $1 i32)
  (call $~lib/ultrain-ts-lib/src/asset/Asset#deserialize
   (i32.load
    (get_local $0)
   )
   (get_local $1)
  )
 )
 (func $~lib/dbmanager/DBManager<CurrencyAccount>#loadObjectByPrimaryIterator (; 82 ;) (type $iiiv) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (set_local $3
   (call $~lib/env/db_get_i64
    (get_local $1)
    (i32.const 0)
    (i32.const 0)
   )
  )
  (set_local $4
   (call $~lib/internal/typedarray/TypedArray<u8_u32>#constructor
    (i32.const 0)
    (get_local $3)
   )
  )
  (set_local $5
   (call $~lib/datastream/DataStream#constructor
    (i32.const 0)
    (i32.load
     (get_local $4)
    )
    (get_local $3)
   )
  )
  (drop
   (call $~lib/env/db_get_i64
    (get_local $1)
    (i32.load
     (get_local $4)
    )
    (get_local $3)
   )
  )
  (call $~lib/ultrain-ts-lib/lib/balance/CurrencyAccount#deserialize
   (get_local $2)
   (get_local $5)
  )
 )
 (func $~lib/dbmanager/DBManager<CurrencyAccount>#get (; 83 ;) (type $iIii) (param $0 i32) (param $1 i64) (param $2 i32) (result i32)
  (local $3 i32)
  (set_local $3
   (call $~lib/env/db_find_i64
    (i64.load offset=8
     (get_local $0)
    )
    (i64.load offset=16
     (get_local $0)
    )
    (i64.load
     (get_local $0)
    )
    (get_local $1)
   )
  )
  (if
   (i32.lt_s
    (get_local $3)
    (i32.const 0)
   )
   (return
    (i32.const 0)
   )
  )
  (call $~lib/dbmanager/DBManager<CurrencyAccount>#loadObjectByPrimaryIterator
   (get_local $0)
   (get_local $3)
   (get_local $2)
  )
  (i32.const 1)
 )
 (func $~lib/ultrain-ts-lib/lib/balance/CurrencyAccount#serialize (; 84 ;) (type $iiv) (param $0 i32) (param $1 i32)
  (call $~lib/ultrain-ts-lib/src/asset/Asset#serialize
   (i32.load
    (get_local $0)
   )
   (get_local $1)
  )
 )
 (func $~lib/datastream/DataStream.measure<CurrencyAccount> (; 85 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (set_local $1
   (call $~lib/datastream/DataStream#constructor
    (i32.const 0)
    (i32.const 0)
    (i32.const 0)
   )
  )
  (call $~lib/ultrain-ts-lib/lib/balance/CurrencyAccount#serialize
   (get_local $0)
   (get_local $1)
  )
  (i32.load offset=8
   (get_local $1)
  )
 )
 (func $~lib/ultrain-ts-lib/lib/balance/CurrencyAccount#primaryKey (; 86 ;) (type $iI) (param $0 i32) (result i64)
  (call $~lib/ultrain-ts-lib/src/asset/Asset#symbolName
   (i32.load
    (get_local $0)
   )
  )
 )
 (func $~lib/dbmanager/DBManager<CurrencyAccount>#emplace (; 87 ;) (type $iIiv) (param $0 i32) (param $1 i64) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i64)
  (call $~lib/env/ultrain_assert
   (i64.eq
    (i64.load offset=8
     (get_local $0)
    )
    (call $~lib/env/current_receiver)
   )
   (i32.const 1936)
  )
  (set_local $3
   (call $~lib/datastream/DataStream.measure<CurrencyAccount>
    (get_local $2)
   )
  )
  (set_local $4
   (call $~lib/internal/typedarray/TypedArray<u8_u32>#constructor
    (i32.const 0)
    (get_local $3)
   )
  )
  (set_local $5
   (call $~lib/datastream/DataStream#constructor
    (i32.const 0)
    (i32.load
     (get_local $4)
    )
    (get_local $3)
   )
  )
  (call $~lib/ultrain-ts-lib/lib/balance/CurrencyAccount#serialize
   (get_local $2)
   (get_local $5)
  )
  (set_local $6
   (call $~lib/ultrain-ts-lib/lib/balance/CurrencyAccount#primaryKey
    (get_local $2)
   )
  )
  (drop
   (call $~lib/env/db_store_i64
    (i64.load offset=16
     (get_local $0)
    )
    (i64.load
     (get_local $0)
    )
    (get_local $1)
    (get_local $6)
    (i32.load
     (get_local $5)
    )
    (i32.load offset=8
     (get_local $5)
    )
   )
  )
 )
 (func $~lib/dbmanager/DBManager<CurrencyAccount>#find (; 88 ;) (type $iIi) (param $0 i32) (param $1 i64) (result i32)
  (local $2 i32)
  (set_local $2
   (call $~lib/env/db_find_i64
    (i64.load offset=8
     (get_local $0)
    )
    (i64.load offset=16
     (get_local $0)
    )
    (i64.load
     (get_local $0)
    )
    (get_local $1)
   )
  )
  (get_local $2)
 )
 (func $~lib/dbmanager/DBManager<CurrencyAccount>#modify (; 89 ;) (type $iIiv) (param $0 i32) (param $1 i64) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (set_local $3
   (call $~lib/dbmanager/DBManager<CurrencyAccount>#find
    (get_local $0)
    (call $~lib/ultrain-ts-lib/lib/balance/CurrencyAccount#primaryKey
     (get_local $2)
    )
   )
  )
  (call $~lib/env/ultrain_assert
   (i32.ge_s
    (get_local $3)
    (i32.const 0)
   )
   (i32.const 2544)
  )
  (call $~lib/env/ultrain_assert
   (i64.eq
    (i64.load offset=8
     (get_local $0)
    )
    (call $~lib/env/current_receiver)
   )
   (i32.const 2664)
  )
  (set_local $4
   (call $~lib/datastream/DataStream.measure<CurrencyAccount>
    (get_local $2)
   )
  )
  (set_local $5
   (call $~lib/internal/typedarray/TypedArray<u8_u32>#constructor
    (i32.const 0)
    (get_local $4)
   )
  )
  (set_local $6
   (call $~lib/datastream/DataStream#constructor
    (i32.const 0)
    (i32.load
     (get_local $5)
    )
    (get_local $4)
   )
  )
  (call $~lib/ultrain-ts-lib/lib/balance/CurrencyAccount#serialize
   (get_local $2)
   (get_local $6)
  )
  (call $~lib/env/db_update_i64
   (get_local $3)
   (get_local $1)
   (i32.load
    (get_local $6)
   )
   (i32.load offset=8
    (get_local $6)
   )
  )
 )
 (func $contract/token/MyContract#addBalance (; 90 ;) (type $iIiIv) (param $0 i32) (param $1 i64) (param $2 i32) (param $3 i64)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i64)
  (set_local $4
   (call $~lib/dbmanager/DBManager<CurrencyAccount>#constructor
    (i32.const 0)
    (call $~lib/ultrain-ts-lib/src/account/NAME
     (get_global $contract/token/ACCOUNTTABLE)
    )
    (call $~lib/ultrain-ts-lib/src/contract/Contract#get:receiver
     (get_local $0)
    )
    (get_local $1)
   )
  )
  (set_local $5
   (call $~lib/ultrain-ts-lib/lib/balance/CurrencyAccount#constructor
    (i32.const 0)
    (call $~lib/ultrain-ts-lib/src/asset/Asset#constructor
     (i32.const 0)
     (i64.const 0)
     (i64.const 357577479428)
    )
   )
  )
  (set_local $6
   (call $~lib/dbmanager/DBManager<CurrencyAccount>#get
    (get_local $4)
    (call $~lib/ultrain-ts-lib/src/asset/Asset#symbolName
     (get_local $2)
    )
    (get_local $5)
   )
  )
  (if
   (i32.eqz
    (get_local $6)
   )
   (block
    (set_local $7
     (call $~lib/ultrain-ts-lib/lib/balance/CurrencyAccount#constructor
      (i32.const 0)
      (get_local $2)
     )
    )
    (call $~lib/dbmanager/DBManager<CurrencyAccount>#emplace
     (get_local $4)
     (get_local $3)
     (get_local $7)
    )
   )
   (block
    (set_local $8
     (i64.add
      (call $~lib/ultrain-ts-lib/src/asset/Asset#getAmount
       (i32.load
        (get_local $5)
       )
      )
      (call $~lib/ultrain-ts-lib/src/asset/Asset#getAmount
       (get_local $2)
      )
     )
    )
    (call $~lib/ultrain-ts-lib/src/asset/Asset#setAmount
     (i32.load
      (get_local $5)
     )
     (get_local $8)
    )
    (call $~lib/dbmanager/DBManager<CurrencyAccount>#modify
     (get_local $4)
     (i64.const 0)
     (get_local $5)
    )
   )
  )
 )
 (func $~lib/ultrain-ts-lib/lib/permission-level/PermissionLevel#constructor (; 91 ;) (type $iIIi) (param $0 i32) (param $1 i64) (param $2 i64) (result i32)
  (local $3 i32)
  (i64.store
   (tee_local $0
    (if (result i32)
     (get_local $0)
     (get_local $0)
     (tee_local $0
      (block (result i32)
       (set_local $3
        (call $~lib/memory/memory.allocate
         (i32.const 16)
        )
       )
       (i64.store
        (get_local $3)
        (i64.const 0)
       )
       (i64.store offset=8
        (get_local $3)
        (i64.const 0)
       )
       (get_local $3)
      )
     )
    )
   )
   (get_local $1)
  )
  (i64.store offset=8
   (get_local $0)
   (get_local $2)
  )
  (get_local $0)
 )
 (func $~lib/ultrain-ts-lib/src/action/TransferParams#constructor (; 92 ;) (type $iIIiii) (param $0 i32) (param $1 i64) (param $2 i64) (param $3 i32) (param $4 i32) (result i32)
  (local $5 i32)
  (i64.store
   (tee_local $0
    (if (result i32)
     (get_local $0)
     (get_local $0)
     (tee_local $0
      (block (result i32)
       (set_local $5
        (call $~lib/memory/memory.allocate
         (i32.const 24)
        )
       )
       (i64.store
        (get_local $5)
        (i64.const 0)
       )
       (i64.store offset=8
        (get_local $5)
        (i64.const 0)
       )
       (i32.store offset=16
        (get_local $5)
        (i32.const 0)
       )
       (i32.store offset=20
        (get_local $5)
        (i32.const 0)
       )
       (get_local $5)
      )
     )
    )
   )
   (get_local $1)
  )
  (i64.store offset=8
   (get_local $0)
   (get_local $2)
  )
  (i32.store offset=16
   (get_local $0)
   (call $~lib/ultrain-ts-lib/src/asset/Asset#constructor
    (i32.const 0)
    (i64.const 0)
    (i64.const 357577479428)
   )
  )
  (i32.store offset=20
   (get_local $0)
   (get_local $4)
  )
  (get_local $0)
 )
 (func $~lib/ultrain-ts-lib/src/action/ActionImpl#constructor (; 93 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (i64.store
   (tee_local $0
    (if (result i32)
     (get_local $0)
     (get_local $0)
     (tee_local $0
      (block (result i32)
       (set_local $1
        (call $~lib/memory/memory.allocate
         (i32.const 20)
        )
       )
       (i64.store
        (get_local $1)
        (i64.const 0)
       )
       (i32.store offset=8
        (get_local $1)
        (i32.const 0)
       )
       (i32.store offset=12
        (get_local $1)
        (i32.const 0)
       )
       (i32.store offset=16
        (get_local $1)
        (i32.const 0)
       )
       (get_local $1)
      )
     )
    )
   )
   (i64.const 0)
  )
  (i32.store offset=8
   (get_local $0)
   (call $~lib/ultrain-ts-lib/lib/name_ex/NameEx#constructor
    (i32.const 0)
    (i64.const 0)
    (i64.const 0)
   )
  )
  (i32.store offset=12
   (get_local $0)
   (i32.const 2832)
  )
  (i32.store offset=16
   (get_local $0)
   (i32.const 2848)
  )
  (get_local $0)
 )
 (func $~lib/array/Array<PermissionLevel>#push (; 94 ;) (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (set_local $2
   (i32.load offset=4
    (get_local $0)
   )
  )
  (set_local $3
   (i32.load
    (get_local $0)
   )
  )
  (set_local $4
   (i32.shr_u
    (i32.load
     (get_local $3)
    )
    (i32.const 2)
   )
  )
  (set_local $5
   (i32.add
    (get_local $2)
    (i32.const 1)
   )
  )
  (if
   (i32.ge_u
    (get_local $2)
    (get_local $4)
   )
   (block
    (if
     (i32.ge_u
      (get_local $2)
      (i32.const 268435454)
     )
     (block
      (call $~lib/env/abort)
      (unreachable)
     )
    )
    (set_local $3
     (call $~lib/internal/arraybuffer/reallocateUnsafe
      (get_local $3)
      (i32.shl
       (get_local $5)
       (i32.const 2)
      )
     )
    )
    (i32.store
     (get_local $0)
     (get_local $3)
    )
   )
  )
  (i32.store offset=4
   (get_local $0)
   (get_local $5)
  )
  (block $~lib/internal/arraybuffer/storeUnsafe<PermissionLevel_PermissionLevel>|inlined.0
   (i32.store offset=8
    (i32.add
     (get_local $3)
     (i32.shl
      (get_local $2)
      (i32.const 2)
     )
    )
    (get_local $1)
   )
  )
  (get_local $5)
 )
 (func $~lib/datastream/DataStream#write<u8> (; 95 ;) (type $iiv) (param $0 i32) (param $1 i32)
  (if
   (i32.eqz
    (call $~lib/datastream/DataStream#isMeasureMode
     (get_local $0)
    )
   )
   (i32.store8
    (i32.add
     (i32.load
      (get_local $0)
     )
     (i32.load offset=8
      (get_local $0)
     )
    )
    (get_local $1)
   )
  )
  (i32.store offset=8
   (get_local $0)
   (i32.add
    (i32.load offset=8
     (get_local $0)
    )
    (i32.const 1)
   )
  )
 )
 (func $~lib/datastream/DataStream#writeVarint32 (; 96 ;) (type $iiv) (param $0 i32) (param $1 i32)
  (local $2 i32)
  (block $break|0
   (loop $continue|0
    (block
     (set_local $2
      (i32.and
       (get_local $1)
       (i32.const 127)
      )
     )
     (set_local $1
      (i32.shr_u
       (get_local $1)
       (i32.const 7)
      )
     )
     (set_local $2
      (i32.or
       (get_local $2)
       (i32.shl
        (if (result i32)
         (i32.gt_u
          (get_local $1)
          (i32.const 0)
         )
         (i32.const 1)
         (i32.const 0)
        )
        (i32.const 7)
       )
      )
     )
     (call $~lib/datastream/DataStream#write<u8>
      (get_local $0)
      (get_local $2)
     )
    )
    (br_if $continue|0
     (get_local $1)
    )
   )
  )
 )
 (func $~lib/datastream/DataStream#writeString (; 97 ;) (type $iiv) (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (set_local $2
   (i32.load
    (get_local $1)
   )
  )
  (call $~lib/datastream/DataStream#writeVarint32
   (get_local $0)
   (get_local $2)
  )
  (if
   (i32.eq
    (get_local $2)
    (i32.const 0)
   )
   (return)
  )
  (set_local $3
   (call $~lib/utf8util/toUTF8Array
    (get_local $1)
   )
  )
  (if
   (i32.eqz
    (call $~lib/datastream/DataStream#isMeasureMode
     (get_local $0)
    )
   )
   (block
    (set_local $4
     (i32.add
      (i32.load
       (get_local $3)
      )
      (i32.const 8)
     )
    )
    (block $~lib/memory/memory.copy|inlined.1
     (set_local $5
      (i32.add
       (i32.load
        (get_local $0)
       )
       (i32.load offset=8
        (get_local $0)
       )
      )
     )
     (set_local $6
      (i32.sub
       (block $~lib/array/Array<u8>#get:length|inlined.0 (result i32)
        (i32.load offset=4
         (get_local $3)
        )
       )
       (i32.const 1)
      )
     )
     (call $~lib/internal/memory/memmove
      (get_local $5)
      (get_local $4)
      (get_local $6)
     )
    )
   )
  )
  (i32.store offset=8
   (get_local $0)
   (i32.add
    (i32.load offset=8
     (get_local $0)
    )
    (i32.sub
     (block $~lib/array/Array<u8>#get:length|inlined.1 (result i32)
      (i32.load offset=4
       (get_local $3)
      )
     )
     (i32.const 1)
    )
   )
  )
 )
 (func $~lib/ultrain-ts-lib/src/action/TransferParams#serialize (; 98 ;) (type $iiv) (param $0 i32) (param $1 i32)
  (call $~lib/datastream/DataStream#write<u64>
   (get_local $1)
   (i64.load
    (get_local $0)
   )
  )
  (call $~lib/datastream/DataStream#write<u64>
   (get_local $1)
   (i64.load offset=8
    (get_local $0)
   )
  )
  (call $~lib/ultrain-ts-lib/src/asset/Asset#serialize
   (i32.load offset=16
    (get_local $0)
   )
   (get_local $1)
  )
  (call $~lib/datastream/DataStream#writeString
   (get_local $1)
   (i32.load offset=20
    (get_local $0)
   )
  )
 )
 (func $~lib/datastream/DataStream.measure<TransferParams> (; 99 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (set_local $1
   (call $~lib/datastream/DataStream#constructor
    (i32.const 0)
    (i32.const 0)
    (i32.const 0)
   )
  )
  (call $~lib/ultrain-ts-lib/src/action/TransferParams#serialize
   (get_local $0)
   (get_local $1)
  )
  (i32.load offset=8
   (get_local $1)
  )
 )
 (func $~lib/array/Array<u8>#__set (; 100 ;) (type $iiiv) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (set_local $3
   (i32.load
    (get_local $0)
   )
  )
  (set_local $4
   (i32.shr_u
    (i32.load
     (get_local $3)
    )
    (i32.const 0)
   )
  )
  (if
   (i32.ge_u
    (get_local $1)
    (get_local $4)
   )
   (block
    (if
     (i32.ge_u
      (get_local $1)
      (i32.const 1073741816)
     )
     (block
      (call $~lib/env/abort)
      (unreachable)
     )
    )
    (set_local $3
     (call $~lib/internal/arraybuffer/reallocateUnsafe
      (get_local $3)
      (i32.shl
       (i32.add
        (get_local $1)
        (i32.const 1)
       )
       (i32.const 0)
      )
     )
    )
    (i32.store
     (get_local $0)
     (get_local $3)
    )
    (i32.store offset=4
     (get_local $0)
     (i32.add
      (get_local $1)
      (i32.const 1)
     )
    )
   )
  )
  (block $~lib/internal/arraybuffer/storeUnsafe<u8_u8>|inlined.1
   (i32.store8 offset=8
    (i32.add
     (get_local $3)
     (i32.shl
      (get_local $1)
      (i32.const 0)
     )
    )
    (get_local $2)
   )
  )
 )
 (func $~lib/datastream/DataStream#toArray<u8> (; 101 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (if
   (i32.eq
    (i32.load offset=8
     (get_local $0)
    )
    (i32.const 0)
   )
   (return
    (call $~lib/array/Array<u8>#constructor
     (i32.const 0)
     (i32.const 0)
    )
   )
  )
  (set_local $1
   (i32.div_u
    (i32.load offset=8
     (get_local $0)
    )
    (i32.const 1)
   )
  )
  (set_local $2
   (call $~lib/array/Array<u8>#constructor
    (i32.const 0)
    (get_local $1)
   )
  )
  (set_local $3
   (i32.const 0)
  )
  (block $break|0
   (set_local $4
    (i32.const 0)
   )
   (loop $repeat|0
    (br_if $break|0
     (i32.eqz
      (i32.lt_u
       (get_local $4)
       (get_local $1)
      )
     )
    )
    (block
     (set_local $5
      (i32.load8_u
       (i32.add
        (i32.load
         (get_local $0)
        )
        (get_local $3)
       )
      )
     )
     (call $~lib/array/Array<u8>#__set
      (get_local $2)
      (get_local $4)
      (get_local $5)
     )
     (set_local $3
      (i32.add
       (get_local $3)
       (i32.const 1)
      )
     )
    )
    (set_local $4
     (i32.add
      (get_local $4)
      (i32.const 1)
     )
    )
    (br $repeat|0)
   )
  )
  (get_local $2)
 )
 (func $~lib/ultrain-ts-lib/lib/name_ex/NameEx#serialize (; 102 ;) (type $iiv) (param $0 i32) (param $1 i32)
  (call $~lib/datastream/DataStream#write<u64>
   (get_local $1)
   (i64.load
    (get_local $0)
   )
  )
  (call $~lib/datastream/DataStream#write<u64>
   (get_local $1)
   (i64.load offset=8
    (get_local $0)
   )
  )
 )
 (func $~lib/array/Array<PermissionLevel>#__get (; 103 ;) (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (set_local $2
   (i32.load
    (get_local $0)
   )
  )
  (if (result i32)
   (i32.lt_u
    (get_local $1)
    (i32.shr_u
     (i32.load
      (get_local $2)
     )
     (i32.const 2)
    )
   )
   (block $~lib/internal/arraybuffer/loadUnsafe<PermissionLevel_PermissionLevel>|inlined.0 (result i32)
    (i32.load offset=8
     (i32.add
      (get_local $2)
      (i32.shl
       (get_local $1)
       (i32.const 2)
      )
     )
    )
   )
   (unreachable)
  )
 )
 (func $~lib/ultrain-ts-lib/lib/permission-level/PermissionLevel#serialize (; 104 ;) (type $iiv) (param $0 i32) (param $1 i32)
  (call $~lib/datastream/DataStream#write<u64>
   (get_local $1)
   (i64.load
    (get_local $0)
   )
  )
  (call $~lib/datastream/DataStream#write<u64>
   (get_local $1)
   (i64.load offset=8
    (get_local $0)
   )
  )
 )
 (func $~lib/datastream/DataStream#writeComplexVector<PermissionLevel> (; 105 ;) (type $iiv) (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (set_local $2
   (block $~lib/array/Array<PermissionLevel>#get:length|inlined.0 (result i32)
    (i32.load offset=4
     (get_local $1)
    )
   )
  )
  (call $~lib/datastream/DataStream#writeVarint32
   (get_local $0)
   (get_local $2)
  )
  (block $break|0
   (set_local $3
    (i32.const 0)
   )
   (loop $repeat|0
    (br_if $break|0
     (i32.eqz
      (i32.lt_u
       (get_local $3)
       (get_local $2)
      )
     )
    )
    (call $~lib/ultrain-ts-lib/lib/permission-level/PermissionLevel#serialize
     (call $~lib/array/Array<PermissionLevel>#__get
      (get_local $1)
      (get_local $3)
     )
     (get_local $0)
    )
    (set_local $3
     (i32.add
      (get_local $3)
      (i32.const 1)
     )
    )
    (br $repeat|0)
   )
  )
 )
 (func $~lib/array/Array<u8>#__get (; 106 ;) (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (set_local $2
   (i32.load
    (get_local $0)
   )
  )
  (if (result i32)
   (i32.lt_u
    (get_local $1)
    (i32.shr_u
     (i32.load
      (get_local $2)
     )
     (i32.const 0)
    )
   )
   (block $~lib/internal/arraybuffer/loadUnsafe<u8_u8>|inlined.0 (result i32)
    (i32.load8_u offset=8
     (i32.add
      (get_local $2)
      (i32.shl
       (get_local $1)
       (i32.const 0)
      )
     )
    )
   )
   (unreachable)
  )
 )
 (func $~lib/datastream/DataStream#writeVector<u8> (; 107 ;) (type $iiv) (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (set_local $2
   (block $~lib/array/Array<u8>#get:length|inlined.2 (result i32)
    (i32.load offset=4
     (get_local $1)
    )
   )
  )
  (call $~lib/datastream/DataStream#writeVarint32
   (get_local $0)
   (get_local $2)
  )
  (block $break|0
   (set_local $3
    (i32.const 0)
   )
   (loop $repeat|0
    (br_if $break|0
     (i32.eqz
      (i32.lt_u
       (get_local $3)
       (get_local $2)
      )
     )
    )
    (call $~lib/datastream/DataStream#write<u8>
     (get_local $0)
     (call $~lib/array/Array<u8>#__get
      (get_local $1)
      (get_local $3)
     )
    )
    (set_local $3
     (i32.add
      (get_local $3)
      (i32.const 1)
     )
    )
    (br $repeat|0)
   )
  )
 )
 (func $~lib/ultrain-ts-lib/src/action/ActionImpl#serialize (; 108 ;) (type $iiv) (param $0 i32) (param $1 i32)
  (call $~lib/datastream/DataStream#write<u64>
   (get_local $1)
   (i64.load
    (get_local $0)
   )
  )
  (call $~lib/ultrain-ts-lib/lib/name_ex/NameEx#serialize
   (i32.load offset=8
    (get_local $0)
   )
   (get_local $1)
  )
  (call $~lib/datastream/DataStream#writeComplexVector<PermissionLevel>
   (get_local $1)
   (i32.load offset=12
    (get_local $0)
   )
  )
  (call $~lib/datastream/DataStream#writeVector<u8>
   (get_local $1)
   (i32.load offset=16
    (get_local $0)
   )
  )
 )
 (func $~lib/datastream/DataStream.measure<ActionImpl> (; 109 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (set_local $1
   (call $~lib/datastream/DataStream#constructor
    (i32.const 0)
    (i32.const 0)
    (i32.const 0)
   )
  )
  (call $~lib/ultrain-ts-lib/src/action/ActionImpl#serialize
   (get_local $0)
   (get_local $1)
  )
  (i32.load offset=8
   (get_local $1)
  )
 )
 (func $~lib/ultrain-ts-lib/src/action/dispatchInline (; 110 ;) (type $iIiiv) (param $0 i32) (param $1 i64) (param $2 i32) (param $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (set_local $4
   (call $~lib/ultrain-ts-lib/src/action/ActionImpl#constructor
    (i32.const 0)
   )
  )
  (drop
   (call $~lib/array/Array<PermissionLevel>#push
    (i32.load offset=12
     (get_local $4)
    )
    (get_local $0)
   )
  )
  (i64.store
   (get_local $4)
   (get_local $1)
  )
  (i32.store offset=8
   (get_local $4)
   (get_local $2)
  )
  (set_local $5
   (call $~lib/datastream/DataStream.measure<TransferParams>
    (get_local $3)
   )
  )
  (set_local $6
   (call $~lib/internal/typedarray/TypedArray<u8_u32>#constructor
    (i32.const 0)
    (get_local $5)
   )
  )
  (set_local $7
   (call $~lib/datastream/DataStream#constructor
    (i32.const 0)
    (i32.load
     (get_local $6)
    )
    (get_local $5)
   )
  )
  (call $~lib/ultrain-ts-lib/src/action/TransferParams#serialize
   (get_local $3)
   (get_local $7)
  )
  (i32.store offset=16
   (get_local $4)
   (call $~lib/datastream/DataStream#toArray<u8>
    (get_local $7)
   )
  )
  (set_local $5
   (call $~lib/datastream/DataStream.measure<ActionImpl>
    (get_local $4)
   )
  )
  (set_local $6
   (call $~lib/internal/typedarray/TypedArray<u8_u32>#constructor
    (i32.const 0)
    (get_local $5)
   )
  )
  (set_local $7
   (call $~lib/datastream/DataStream#constructor
    (i32.const 0)
    (i32.load
     (get_local $6)
    )
    (get_local $5)
   )
  )
  (call $~lib/ultrain-ts-lib/src/action/ActionImpl#serialize
   (get_local $4)
   (get_local $7)
  )
  (call $~lib/ultrain-ts-lib/internal/action.d/env.send_inline
   (i32.load
    (get_local $7)
   )
   (i32.load offset=8
    (get_local $7)
   )
  )
 )
 (func $contract/token/MyContract#issue (; 111 ;) (type $iIiiv) (param $0 i32) (param $1 i64) (param $2 i32) (param $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i64)
  (local $8 i32)
  (local $9 i32)
  (call $~lib/env/ultrain_assert
   (call $~lib/ultrain-ts-lib/src/asset/Asset#isSymbolValid
    (get_local $2)
   )
   (i32.const 2048)
  )
  (call $~lib/env/ultrain_assert
   (i32.le_s
    (i32.load
     (get_local $3)
    )
    (i32.const 256)
   )
   (i32.const 2120)
  )
  (set_local $4
   (call $~lib/dbmanager/DBManager<CurrencyStats>#constructor
    (i32.const 0)
    (call $~lib/ultrain-ts-lib/src/account/NAME
     (get_global $contract/token/STATSTABLE)
    )
    (call $~lib/ultrain-ts-lib/src/contract/Contract#get:receiver
     (get_local $0)
    )
    (call $~lib/ultrain-ts-lib/src/asset/Asset#symbolName
     (get_local $2)
    )
   )
  )
  (set_local $5
   (call $~lib/ultrain-ts-lib/lib/balance/CurrencyStats#constructor
    (i32.const 0)
    (call $~lib/ultrain-ts-lib/src/asset/Asset#constructor
     (i32.const 0)
     (i64.const 0)
     (i64.const 357577479428)
    )
    (call $~lib/ultrain-ts-lib/src/asset/Asset#constructor
     (i32.const 0)
     (i64.const 0)
     (i64.const 357577479428)
    )
    (i64.const 0)
    (i64.const 0)
   )
  )
  (set_local $6
   (call $~lib/dbmanager/DBManager<CurrencyStats>#get
    (get_local $4)
    (call $~lib/ultrain-ts-lib/src/asset/Asset#symbolName
     (get_local $2)
    )
    (get_local $5)
   )
  )
  (call $~lib/env/ultrain_assert
   (get_local $6)
   (i32.const 2208)
  )
  (call $~lib/ultrain-ts-lib/internal/action.d/env.require_auth
   (i64.load offset=8
    (get_local $5)
   )
  )
  (call $~lib/env/ultrain_assert
   (call $~lib/ultrain-ts-lib/src/asset/Asset#isValid
    (get_local $2)
   )
   (i32.const 2288)
  )
  (call $~lib/env/ultrain_assert
   (i64.eq
    (call $~lib/ultrain-ts-lib/src/asset/Asset#getSymbol
     (get_local $2)
    )
    (call $~lib/ultrain-ts-lib/src/asset/Asset#getSymbol
     (i32.load offset=4
      (get_local $5)
     )
    )
   )
   (i32.const 2352)
  )
  (call $~lib/env/ultrain_assert
   (i64.le_u
    (call $~lib/ultrain-ts-lib/src/asset/Asset#getAmount
     (get_local $2)
    )
    (i64.sub
     (call $~lib/ultrain-ts-lib/src/asset/Asset#getAmount
      (i32.load offset=4
       (get_local $5)
      )
     )
     (call $~lib/ultrain-ts-lib/src/asset/Asset#getAmount
      (i32.load
       (get_local $5)
      )
     )
    )
   )
   (i32.const 2440)
  )
  (set_local $7
   (i64.add
    (call $~lib/ultrain-ts-lib/src/asset/Asset#getAmount
     (i32.load
      (get_local $5)
     )
    )
    (call $~lib/ultrain-ts-lib/src/asset/Asset#getAmount
     (get_local $2)
    )
   )
  )
  (call $~lib/ultrain-ts-lib/src/asset/Asset#setAmount
   (i32.load
    (get_local $5)
   )
   (get_local $7)
  )
  (call $~lib/dbmanager/DBManager<CurrencyStats>#modify
   (get_local $4)
   (i64.const 0)
   (get_local $5)
  )
  (call $contract/token/MyContract#addBalance
   (get_local $0)
   (i64.load offset=8
    (get_local $5)
   )
   (get_local $2)
   (i64.load offset=8
    (get_local $5)
   )
  )
  (if
   (i64.ne
    (get_local $1)
    (i64.load offset=8
     (get_local $5)
    )
   )
   (block
    (set_local $8
     (call $~lib/ultrain-ts-lib/lib/permission-level/PermissionLevel#constructor
      (i32.const 0)
      (i64.const 0)
      (i64.const 0)
     )
    )
    (i64.store
     (get_local $8)
     (i64.load offset=8
      (get_local $5)
     )
    )
    (i64.store offset=8
     (get_local $8)
     (call $~lib/ultrain-ts-lib/src/account/NAME
      (i32.const 2776)
     )
    )
    (set_local $9
     (call $~lib/ultrain-ts-lib/src/action/TransferParams#constructor
      (i32.const 0)
      (i64.const 0)
      (i64.const 0)
      (call $~lib/ultrain-ts-lib/src/asset/Asset#constructor
       (i32.const 0)
       (i64.const 0)
       (i64.const 357577479428)
      )
      (i32.const 2792)
     )
    )
    (i64.store
     (get_local $9)
     (i64.load offset=8
      (get_local $5)
     )
    )
    (i64.store offset=8
     (get_local $9)
     (get_local $1)
    )
    (i32.store offset=16
     (get_local $9)
     (get_local $2)
    )
    (i32.store offset=20
     (get_local $9)
     (get_local $3)
    )
    (call $~lib/ultrain-ts-lib/src/action/dispatchInline
     (get_local $8)
     (call $~lib/ultrain-ts-lib/src/contract/Contract#get:receiver
      (get_local $0)
     )
     (call $~lib/ultrain-ts-lib/lib/name_ex/NEX
      (i32.const 2800)
     )
     (get_local $9)
    )
   )
  )
 )
 (func $~lib/dbmanager/DBManager<CurrencyAccount>#erase (; 112 ;) (type $iIv) (param $0 i32) (param $1 i64)
  (local $2 i32)
  (call $~lib/env/ultrain_assert
   (i64.eq
    (i64.load offset=8
     (get_local $0)
    )
    (call $~lib/env/current_receiver)
   )
   (i32.const 3552)
  )
  (set_local $2
   (call $~lib/dbmanager/DBManager<CurrencyAccount>#find
    (get_local $0)
    (get_local $1)
   )
  )
  (if
   (i32.ge_s
    (get_local $2)
    (i32.const 0)
   )
   (call $~lib/env/db_remove_i64
    (get_local $2)
   )
   (nop)
  )
 )
 (func $contract/token/MyContract#subBalance (; 113 ;) (type $iIiv) (param $0 i32) (param $1 i64) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i64)
  (set_local $3
   (call $~lib/dbmanager/DBManager<CurrencyAccount>#constructor
    (i32.const 0)
    (call $~lib/ultrain-ts-lib/src/account/NAME
     (get_global $contract/token/ACCOUNTTABLE)
    )
    (call $~lib/ultrain-ts-lib/src/contract/Contract#get:receiver
     (get_local $0)
    )
    (get_local $1)
   )
  )
  (set_local $4
   (call $~lib/ultrain-ts-lib/lib/balance/CurrencyAccount#constructor
    (i32.const 0)
    (call $~lib/ultrain-ts-lib/src/asset/Asset#constructor
     (i32.const 0)
     (i64.const 0)
     (i64.const 357577479428)
    )
   )
  )
  (set_local $5
   (call $~lib/dbmanager/DBManager<CurrencyAccount>#get
    (get_local $3)
    (call $~lib/ultrain-ts-lib/src/asset/Asset#symbolName
     (get_local $2)
    )
    (get_local $4)
   )
  )
  (call $~lib/env/ultrain_assert
   (get_local $5)
   (i32.const 3376)
  )
  (call $~lib/env/ultrain_assert
   (i64.ge_u
    (call $~lib/ultrain-ts-lib/src/asset/Asset#getAmount
     (i32.load
      (get_local $4)
     )
    )
    (call $~lib/ultrain-ts-lib/src/asset/Asset#getAmount
     (get_local $2)
    )
   )
   (i32.const 3472)
  )
  (if
   (i64.eq
    (call $~lib/ultrain-ts-lib/src/asset/Asset#getAmount
     (i32.load
      (get_local $4)
     )
    )
    (call $~lib/ultrain-ts-lib/src/asset/Asset#getAmount
     (get_local $2)
    )
   )
   (call $~lib/dbmanager/DBManager<CurrencyAccount>#erase
    (get_local $3)
    (call $~lib/ultrain-ts-lib/lib/balance/CurrencyAccount#primaryKey
     (get_local $4)
    )
   )
   (block
    (set_local $6
     (i64.sub
      (call $~lib/ultrain-ts-lib/src/asset/Asset#getAmount
       (i32.load
        (get_local $4)
       )
      )
      (call $~lib/ultrain-ts-lib/src/asset/Asset#getAmount
       (get_local $2)
      )
     )
    )
    (call $~lib/ultrain-ts-lib/src/asset/Asset#setAmount
     (i32.load
      (get_local $4)
     )
     (get_local $6)
    )
    (call $~lib/dbmanager/DBManager<CurrencyAccount>#modify
     (get_local $3)
     (get_local $1)
     (get_local $4)
    )
   )
  )
 )
 (func $contract/token/MyContract#transfer (; 114 ;) (type $iIIiiv) (param $0 i32) (param $1 i64) (param $2 i64) (param $3 i32) (param $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (call $~lib/env/ultrain_assert
   (i64.ne
    (get_local $1)
    (get_local $2)
   )
   (i32.const 2856)
  )
  (call $~lib/ultrain-ts-lib/internal/action.d/env.require_auth
   (get_local $1)
  )
  (call $~lib/env/ultrain_assert
   (call $~lib/ultrain-ts-lib/internal/action.d/env.is_account
    (get_local $2)
   )
   (i32.const 2944)
  )
  (set_local $5
   (call $~lib/dbmanager/DBManager<CurrencyStats>#constructor
    (i32.const 0)
    (call $~lib/ultrain-ts-lib/src/account/NAME
     (get_global $contract/token/STATSTABLE)
    )
    (call $~lib/ultrain-ts-lib/src/contract/Contract#get:receiver
     (get_local $0)
    )
    (call $~lib/ultrain-ts-lib/src/asset/Asset#symbolName
     (get_local $3)
    )
   )
  )
  (set_local $6
   (call $~lib/ultrain-ts-lib/lib/balance/CurrencyStats#constructor
    (i32.const 0)
    (call $~lib/ultrain-ts-lib/src/asset/Asset#constructor
     (i32.const 0)
     (i64.const 0)
     (i64.const 357577479428)
    )
    (call $~lib/ultrain-ts-lib/src/asset/Asset#constructor
     (i32.const 0)
     (i64.const 0)
     (i64.const 357577479428)
    )
    (i64.const 0)
    (i64.const 0)
   )
  )
  (set_local $7
   (call $~lib/dbmanager/DBManager<CurrencyStats>#get
    (get_local $5)
    (call $~lib/ultrain-ts-lib/src/asset/Asset#symbolName
     (get_local $3)
    )
    (get_local $6)
   )
  )
  (call $~lib/env/ultrain_assert
   (get_local $7)
   (i32.const 3032)
  )
  (call $~lib/ultrain-ts-lib/internal/action.d/env.require_recipient
   (get_local $1)
  )
  (call $~lib/ultrain-ts-lib/internal/action.d/env.require_recipient
   (get_local $2)
  )
  (call $~lib/env/ultrain_assert
   (call $~lib/ultrain-ts-lib/src/asset/Asset#isValid
    (get_local $3)
   )
   (i32.const 3120)
  )
  (call $~lib/env/ultrain_assert
   (i64.eq
    (call $~lib/ultrain-ts-lib/src/asset/Asset#getSymbol
     (get_local $3)
    )
    (call $~lib/ultrain-ts-lib/src/asset/Asset#getSymbol
     (i32.load
      (get_local $6)
     )
    )
   )
   (i32.const 3192)
  )
  (call $~lib/env/ultrain_assert
   (i32.le_s
    (i32.load
     (get_local $4)
    )
    (i32.const 256)
   )
   (i32.const 3280)
  )
  (call $contract/token/MyContract#subBalance
   (get_local $0)
   (get_local $1)
   (get_local $3)
  )
  (call $contract/token/MyContract#addBalance
   (get_local $0)
   (get_local $2)
   (get_local $3)
   (get_local $1)
  )
 )
 (func $contract/token/MyContract#getSupply (; 115 ;) (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i64)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (set_local $2
   (i64.shr_u
    (call $~lib/ultrain-ts-lib/src/asset/StringToSymbol
     (i32.const 0)
     (get_local $1)
    )
    (i64.const 8)
   )
  )
  (set_local $3
   (call $~lib/dbmanager/DBManager<CurrencyStats>#constructor
    (i32.const 0)
    (call $~lib/ultrain-ts-lib/src/account/NAME
     (get_global $contract/token/STATSTABLE)
    )
    (call $~lib/ultrain-ts-lib/src/contract/Contract#get:receiver
     (get_local $0)
    )
    (get_local $2)
   )
  )
  (set_local $4
   (call $~lib/ultrain-ts-lib/lib/balance/CurrencyStats#constructor
    (i32.const 0)
    (call $~lib/ultrain-ts-lib/src/asset/Asset#constructor
     (i32.const 0)
     (i64.const 0)
     (i64.const 357577479428)
    )
    (call $~lib/ultrain-ts-lib/src/asset/Asset#constructor
     (i32.const 0)
     (i64.const 0)
     (i64.const 357577479428)
    )
    (i64.const 0)
    (i64.const 0)
   )
  )
  (set_local $5
   (call $~lib/dbmanager/DBManager<CurrencyStats>#get
    (get_local $3)
    (get_local $2)
    (get_local $4)
   )
  )
  (call $~lib/env/ultrain_assert
   (get_local $5)
   (i32.const 3664)
  )
  (i32.load
   (get_local $4)
  )
 )
 (func $contract/token/MyContract#getBalance (; 116 ;) (type $iIii) (param $0 i32) (param $1 i64) (param $2 i32) (result i32)
  (local $3 i64)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (set_local $3
   (i64.shr_u
    (call $~lib/ultrain-ts-lib/src/asset/StringToSymbol
     (i32.const 0)
     (get_local $2)
    )
    (i64.const 8)
   )
  )
  (set_local $4
   (call $~lib/dbmanager/DBManager<CurrencyAccount>#constructor
    (i32.const 0)
    (call $~lib/ultrain-ts-lib/src/account/NAME
     (get_global $contract/token/ACCOUNTTABLE)
    )
    (get_local $1)
    (get_local $3)
   )
  )
  (set_local $5
   (call $~lib/ultrain-ts-lib/lib/balance/CurrencyAccount#constructor
    (i32.const 0)
    (call $~lib/ultrain-ts-lib/src/asset/Asset#constructor
     (i32.const 0)
     (i64.const 0)
     (i64.const 357577479428)
    )
   )
  )
  (set_local $6
   (call $~lib/dbmanager/DBManager<CurrencyAccount>#get
    (get_local $4)
    (get_local $3)
    (get_local $5)
   )
  )
  (call $~lib/env/ultrain_assert
   (get_local $6)
   (i32.const 3752)
  )
  (i32.load
   (get_local $5)
  )
 )
 (func $~lib/ultrain-ts-lib/src/contract/Contract#constructor (; 117 ;) (type $iIi) (param $0 i32) (param $1 i64) (result i32)
  (local $2 i32)
  (i64.store
   (tee_local $0
    (if (result i32)
     (get_local $0)
     (get_local $0)
     (tee_local $0
      (block (result i32)
       (set_local $2
        (call $~lib/memory/memory.allocate
         (i32.const 12)
        )
       )
       (i64.store
        (get_local $2)
        (i64.const 0)
       )
       (i32.store offset=8
        (get_local $2)
        (i32.const 0)
       )
       (get_local $2)
      )
     )
    )
   )
   (get_local $1)
  )
  (get_local $0)
 )
 (func $~lib/datastream/DataStream#read<u8> (; 118 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (set_local $1
   (i32.load8_u
    (i32.add
     (i32.load
      (get_local $0)
     )
     (i32.load offset=8
      (get_local $0)
     )
    )
   )
  )
  (i32.store offset=8
   (get_local $0)
   (i32.add
    (i32.load offset=8
     (get_local $0)
    )
    (i32.const 1)
   )
  )
  (get_local $1)
 )
 (func $~lib/datastream/DataStream#readVarint32 (; 119 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (set_local $1
   (i32.const 0)
  )
  (set_local $2
   (i32.const 0)
  )
  (block $break|0
   (loop $continue|0
    (block
     (set_local $3
      (call $~lib/datastream/DataStream#read<u8>
       (get_local $0)
      )
     )
     (set_local $1
      (i32.or
       (get_local $1)
       (i32.shl
        (i32.and
         (get_local $3)
         (i32.const 127)
        )
        (i32.mul
         (i32.const 7)
         (block (result i32)
          (set_local $4
           (get_local $2)
          )
          (set_local $2
           (i32.add
            (get_local $4)
            (i32.const 1)
           )
          )
          (get_local $4)
         )
        )
       )
      )
     )
    )
    (br_if $continue|0
     (i32.and
      (get_local $3)
      (i32.const 128)
     )
    )
   )
  )
  (get_local $1)
 )
 (func $~lib/datastream/DataStream#readString (; 120 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (set_local $1
   (call $~lib/datastream/DataStream#readVarint32
    (get_local $0)
   )
  )
  (if
   (i32.eq
    (get_local $1)
    (i32.const 0)
   )
   (return
    (i32.const 2792)
   )
  )
  (set_local $3
   (block $~lib/memory/memory.allocate|inlined.1 (result i32)
    (set_local $2
     (i32.add
      (get_global $~lib/datastream/HEADER_SIZE)
      (i32.shl
       (get_local $1)
       (i32.const 1)
      )
     )
    )
    (br $~lib/memory/memory.allocate|inlined.1
     (call $~lib/allocator/arena/__memory_allocate
      (get_local $2)
     )
    )
   )
  )
  (i32.store
   (get_local $3)
   (get_local $1)
  )
  (set_local $2
   (get_local $3)
  )
  (set_local $4
   (i32.const 0)
  )
  (block $break|0
   (loop $continue|0
    (if
     (i32.lt_u
      (get_local $4)
      (get_local $1)
     )
     (block
      (block
       (set_local $5
        (call $~lib/datastream/DataStream#read<u8>
         (get_local $0)
        )
       )
       (i32.store16 offset=4
        (i32.add
         (get_local $2)
         (i32.mul
          (i32.const 2)
          (get_local $4)
         )
        )
        (get_local $5)
       )
       (set_local $4
        (i32.add
         (get_local $4)
         (i32.const 1)
        )
       )
      )
      (br $continue|0)
     )
    )
   )
  )
  (get_local $2)
 )
 (func $contract/token/apply (; 121 ;) (type $IIIIv) (param $0 i64) (param $1 i64) (param $2 i64) (param $3 i64)
  (local $4 i32)
  (local $5 i32)
  (local $6 i64)
  (local $7 i32)
  (local $8 i32)
  (local $9 i64)
  (if
   (i64.eq
    (get_local $0)
    (get_local $1)
   )
   (block
    (set_local $4
     (call $~lib/ultrain-ts-lib/src/contract/Contract#constructor
      (i32.const 0)
      (get_local $0)
     )
    )
    (call $~lib/ultrain-ts-lib/src/contract/Contract#setActionName
     (get_local $4)
     (get_local $2)
     (get_local $3)
    )
    (call $~lib/ultrain-ts-lib/src/contract/Contract#onInit
     (get_local $4)
    )
    (set_local $5
     (call $~lib/ultrain-ts-lib/src/contract/Contract#getDataStream
      (get_local $4)
     )
    )
    (if
     (call $~lib/ultrain-ts-lib/src/contract/Contract#isAction
      (get_local $4)
      (i32.const 3840)
     )
     (block
      (set_local $6
       (call $~lib/datastream/DataStream#read<u64>
        (get_local $5)
       )
      )
      (set_local $7
       (call $~lib/ultrain-ts-lib/src/asset/Asset#constructor
        (i32.const 0)
        (i64.const 0)
        (i64.const 357577479428)
       )
      )
      (call $~lib/ultrain-ts-lib/src/asset/Asset#deserialize
       (get_local $7)
       (get_local $5)
      )
      (call $contract/token/MyContract#create
       (get_local $4)
       (get_local $6)
       (get_local $7)
      )
     )
    )
    (if
     (call $~lib/ultrain-ts-lib/src/contract/Contract#isAction
      (get_local $4)
      (i32.const 3856)
     )
     (block
      (set_local $6
       (call $~lib/datastream/DataStream#read<u64>
        (get_local $5)
       )
      )
      (set_local $7
       (call $~lib/ultrain-ts-lib/src/asset/Asset#constructor
        (i32.const 0)
        (i64.const 0)
        (i64.const 357577479428)
       )
      )
      (call $~lib/ultrain-ts-lib/src/asset/Asset#deserialize
       (get_local $7)
       (get_local $5)
      )
      (set_local $8
       (call $~lib/datastream/DataStream#readString
        (get_local $5)
       )
      )
      (call $contract/token/MyContract#issue
       (get_local $4)
       (get_local $6)
       (get_local $7)
       (get_local $8)
      )
     )
    )
    (if
     (call $~lib/ultrain-ts-lib/src/contract/Contract#isAction
      (get_local $4)
      (i32.const 2800)
     )
     (block
      (set_local $6
       (call $~lib/datastream/DataStream#read<u64>
        (get_local $5)
       )
      )
      (set_local $9
       (call $~lib/datastream/DataStream#read<u64>
        (get_local $5)
       )
      )
      (set_local $8
       (call $~lib/ultrain-ts-lib/src/asset/Asset#constructor
        (i32.const 0)
        (i64.const 0)
        (i64.const 357577479428)
       )
      )
      (call $~lib/ultrain-ts-lib/src/asset/Asset#deserialize
       (get_local $8)
       (get_local $5)
      )
      (set_local $7
       (call $~lib/datastream/DataStream#readString
        (get_local $5)
       )
      )
      (call $contract/token/MyContract#transfer
       (get_local $4)
       (get_local $6)
       (get_local $9)
       (get_local $8)
       (get_local $7)
      )
     )
    )
    (if
     (call $~lib/ultrain-ts-lib/src/contract/Contract#isAction
      (get_local $4)
      (i32.const 3872)
     )
     (block
      (set_local $7
       (call $~lib/datastream/DataStream#readString
        (get_local $5)
       )
      )
      (drop
       (call $contract/token/MyContract#getSupply
        (get_local $4)
        (get_local $7)
       )
      )
     )
    )
    (if
     (call $~lib/ultrain-ts-lib/src/contract/Contract#isAction
      (get_local $4)
      (i32.const 3896)
     )
     (block
      (set_local $9
       (call $~lib/datastream/DataStream#read<u64>
        (get_local $5)
       )
      )
      (set_local $7
       (call $~lib/datastream/DataStream#readString
        (get_local $5)
       )
      )
      (drop
       (call $contract/token/MyContract#getBalance
        (get_local $4)
        (get_local $9)
        (get_local $7)
       )
      )
     )
    )
    (call $~lib/ultrain-ts-lib/src/contract/Contract#onStop
     (get_local $4)
    )
   )
  )
 )
 (func $start (; 122 ;) (type $v)
  (local $0 i32)
  (set_global $~lib/allocator/arena/startOffset
   (i32.and
    (i32.add
     (get_global $HEAP_BASE)
     (get_global $~lib/internal/allocator/AL_MASK)
    )
    (i32.xor
     (get_global $~lib/internal/allocator/AL_MASK)
     (i32.const -1)
    )
   )
  )
  (set_global $~lib/allocator/arena/offset
   (get_global $~lib/allocator/arena/startOffset)
  )
  (nop)
  (set_global $~lib/ultrain-ts-lib/src/log/Log
   (block (result i32)
    (set_local $0
     (call $~lib/memory/memory.allocate
      (i32.const 0)
     )
    )
    (get_local $0)
   )
  )
  (set_global $~lib/ultrain-ts-lib/src/asset/SYS
   (call $~lib/ultrain-ts-lib/src/asset/StringToSymbol
    (i32.const 4)
    (i32.const 1280)
   )
  )
  (set_global $~lib/ultrain-ts-lib/src/asset/SYS_NAME
   (i64.shr_u
    (get_global $~lib/ultrain-ts-lib/src/asset/SYS)
    (i64.const 8)
   )
  )
 )
 (func $MyContract#get:_receiver (; 123 ;) (type $iI) (param $0 i32) (result i64)
  (i64.load
   (get_local $0)
  )
 )
 (func $MyContract#set:_receiver (; 124 ;) (type $iIv) (param $0 i32) (param $1 i64)
  (i64.store
   (get_local $0)
   (get_local $1)
  )
 )
)
