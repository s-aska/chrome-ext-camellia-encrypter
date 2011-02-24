/* CryptoCipherCamellia.js:
 *    100% Pure JavaScript Camellia 128-bit block cipher library.
 * This library is public domain.
 *
 * Hiroyuki OYAMA, oyama@module.jp, http://module.jp/
 */


var PACKAGE = CryptoCipherCamellia = function() {
    this.key_length = 128/8;
    this.blocksize = 128/8;
    this.kw = new Array(8*4);
    this.k = new Array(24*8);
    this.kl = new Array(8*6);
    this.S1 = [
        112,130, 44,236,179, 39,192,229,228,133, 87, 53,234, 12,174, 65,
         35,239,107,147, 69, 25,165, 33,237, 14, 79, 78, 29,101,146,189,
        134,184,175,143,124,235, 31,206, 62, 48,220, 95, 94,197, 11, 26,
        166,225, 57,202,213, 71, 93, 61,217,  1, 90,214, 81, 86,108, 77,
        139, 13,154,102,251,204,176, 45,116, 18, 43, 32,240,177,132,153,
        223, 76,203,194, 52,126,118,  5,109,183,169, 49,209, 23,  4,215,
         20, 88, 58, 97,222, 27, 17, 28, 50, 15,156, 22, 83, 24,242, 34,
        254, 68,207,178,195,181,122,145, 36,  8,232,168, 96,252,105, 80,
        170,208,160,125,161,137, 98,151, 84, 91, 30,149,224,255,100,210,
         16,196,  0, 72,163,247,117,219,138,  3,230,218,  9, 63,221,148,
        135, 92,131,  2,205, 74,144, 51,115,103,246,243,157,127,191,226,
         82,155,216, 38,200, 55,198, 59,129,150,111, 75, 19,190, 99, 46,
        233,121,167,140,159,110,188,142, 41,245,249,182, 47,253,180, 89,
        120,152,  6,106,231, 70,113,186,212, 37,171, 66,136,162,141,250,
        114,  7,185, 85,248,238,172, 10, 54, 73, 42,104, 60, 56,241,164,
         64, 40,211,123,187,201, 67,193, 21,227,173,244,119,199,128,158
    ];
    this.S2 = [
        224,  5, 88,217,103, 78,129,203,201, 11,174,106,213, 24, 93,130,
         70,223,214, 39,138, 50, 75, 66,219, 28,158,156, 58,202, 37,123,
         13,113, 95, 31,248,215, 62,157,124, 96,185,190,188,139, 22, 52,
         77,195,114,149,171,142,186,122,179,  2,180,173,162,172,216,154,
         23, 26, 53,204,247,153, 97, 90,232, 36, 86, 64,225, 99,  9, 51,
        191,152,151,133,104,252,236, 10,218,111, 83, 98,163, 46,  8,175,
         40,176,116,194,189, 54, 34, 56,100, 30, 57, 44,166, 48,229, 68,
        253,136,159,101,135,107,244, 35, 72, 16,209, 81,192,249,210,160,
         85,161, 65,250, 67, 19,196, 47,168,182, 60, 43,193,255,200,165,
         32,137,  0,144, 71,239,234,183, 21,  6,205,181, 18,126,187, 41,
         15,184,  7,  4,155,148, 33,102,230,206,237,231, 59,254,127,197,
        164, 55,177, 76,145,110,141,118,  3, 45,222,150, 38,125,198, 92,
        211,242, 79, 25, 63,220,121, 29, 82,235,243,109, 94,251,105,178,
        240, 49, 12,212,207,140,226,117,169, 74, 87,132, 17, 69, 27,245,
        228, 14,115,170,241,221, 89, 20,108,146, 84,208,120,112,227, 73,
        128, 80,167,246,119,147,134,131, 42,199, 91,233,238,143,  1, 61
    ];
    this.S3 = [
         56, 65, 22,118,217,147, 96,242,114,194,171,154,117,6, 87,160,
        145,247,181,201,162,140,210,144,246,7,167,39,142,178,73,222,
         67, 92,215,199,62,245,143,103,31,24,110,175,47,226,133,13,
         83,240,156,101,234,163,174,158,236,128,45,107,168,43,54,166,
        197,134,77,51,253,102,88,150,58,9,149,16,120,216,66,204,
        239, 38,229,97,26,63,59,130,182,219,212,152,232,139,2,235,
         10, 44,29,176,111,141,136,14,25,135,78,11,169,12,121,17,
        127, 34,231,89,225,218,61,200,18,4,116,84,48,126,180,40,
         85,104,80,190,208,196,49,203,42,173,15,202,112,255,50,105,
          8, 98,0,36,209,251,186,237,69,129,115,109,132,159,238,74,
        195, 46,193,1,230,37,72,153,185,179,123,249,206,191,223,113,
         41,205,108,19,100,155,99,157,192,75,183,165,137,95,177,23,
        244,188,211,70,207,55,94,71,148,250,252,91,151,254,90,172,
         60, 76,3,53,243,35,184,93,106,146,213,33,68,81,198,125,
         57,131,220,170,124,119,86,5,27,164,21,52,30,28,248,82,
         32, 20,233,189,221,228,161,224,138,241,214,122,187,227, 64, 79
    ];
    this.S4 = [
        112, 44,179,192,228, 87,234,174, 35,107, 69,165,237, 79, 29,146,
        134,175,124, 31, 62,220, 94, 11,166, 57,213, 93,217, 90, 81,108,
        139,154,251,176,116, 43,240,132,223,203, 52,118,109,169,209,  4,
         20, 58,222, 17, 50,156, 83,242,254,207,195,122, 36,232, 96,105,
        170,160,161, 98, 84, 30,224,100, 16,  0,163,117,138,230,  9,221,
        135,131,205,144,115,246,157,191, 82,216,200,198,129,111, 19, 99,
        233,167,159,188, 41,249, 47,180,120,  6,231,113,212,171,136,141,
        114,185,248,172, 54, 42, 60,241, 64,211,187, 67, 21,173,119,128,
        130,236, 39,229,133, 53, 12, 65,239,147, 25, 33, 14, 78,101,189,
        184,143,235,206, 48, 95,197, 26,225,202, 71, 61,  1,214, 86, 77,
         13,102,204, 45, 18, 32,177,153, 76,194,126,  5,183, 49, 23,215,
         88, 97, 27, 28, 15, 22, 24, 34, 68,178,181,145,  8,168,252, 80,
        208,125,137,151, 91,149,255,210,196, 72,247,219,  3,218, 63,148,
         92,  2, 74, 51,103,243,127,226,155, 38, 55, 59,150, 75,190, 46,
        121,140,110,142,245,182,253, 89,152,106, 70,186, 37, 66,162,250,
          7, 85,238, 10, 73,104, 56,164, 40,123,201,193,227,244,199,158
    ];
    this.SIGMA1 = [ 0xA0, 0x9E, 0x66, 0x7F, 0x3B, 0xCC, 0x90, 0x8B ];
    this.SIGMA2 = [ 0xB6, 0x7A, 0xE8, 0x58, 0x4C, 0xAA, 0x73, 0xB2 ];
    this.SIGMA3 = [ 0xC6, 0xEF, 0x37, 0x2F, 0xE9, 0x4F, 0x82, 0xBE ];
    this.SIGMA4 = [ 0x54, 0xFF, 0x53, 0xA5, 0xF1, 0xD3, 0x6F, 0x1C ];
    this.SIGMA5 = [ 0x10, 0xE5, 0x27, 0xFA, 0xDE, 0x68, 0x2D, 0x1D ];
    this.SIGMA6 = [ 0xB0, 0x56, 0x88, 0xC2, 0xB3, 0xE6, 0xC1, 0xFD ];
    return this;
};



PACKAGE.prototype._xor_block = function (x, y, l) {
    var r = new Array(l);
    for (var i = 0; i < l; i++) {
        r[i] = x[i] ^ y[i];
    }
    return r;
};


PACKAGE.prototype._feistel = function (dist, off, x, k) {
    var ws = new Array(8);
    var w = this._xor_block(x, k, 8);
    ws[0] = this.S1[w[0]];
    ws[1] = this.S2[w[1]];
    ws[2] = this.S3[w[2]];
    ws[3] = this.S4[w[3]];
    ws[4] = this.S2[w[4]];
    ws[5] = this.S3[w[5]];
    ws[6] = this.S4[w[6]];
    ws[7] = this.S1[w[7]];
    dist[0+off] ^= ws[0] ^ ws[2] ^ ws[3] ^ ws[5] ^ ws[6] ^ ws[7];
    dist[1+off] ^= ws[0] ^ ws[1] ^ ws[3] ^ ws[4] ^ ws[6] ^ ws[7];
    dist[2+off] ^= ws[0] ^ ws[1] ^ ws[2] ^ ws[4] ^ ws[5] ^ ws[7];
    dist[3+off] ^= ws[1] ^ ws[2] ^ ws[3] ^ ws[4] ^ ws[5] ^ ws[6];
    dist[4+off] ^= ws[0] ^ ws[1] ^ ws[5] ^ ws[6] ^ ws[7];
    dist[5+off] ^= ws[1] ^ ws[2] ^ ws[4] ^ ws[6] ^ ws[7];
    dist[6+off] ^= ws[2] ^ ws[3] ^ ws[4] ^ ws[5] ^ ws[7];
    dist[7+off] ^= ws[0] ^ ws[3] ^ ws[4] ^ ws[5] ^ ws[6];
};


PACKAGE.prototype._rot_shift = function (dist, off, src, bit, len) {
    if (bit == 0) {
        this._move(dist, 0, src, 0, len);
        return;
    }
    var o = Math.floor(bit / 8) + 1;
    var so = o * 8 - bit;
    o = o % len;
    for (var i = 0; i < len; i++) {
        dist[i+off] = ((src[(i+o)%len] >> so) & 0xff)
                    | ((src[(i+o-1)%len] << (8-so)) & 0xff);
    }
};


PACKAGE.prototype.setup = function (key) {
    var kl = new Array();
    var kr = new Array();
    var ka = new Array();

    this.key_length = key.length;
    if (key.length == 16) {
        kl = key.slice(0, 16);
        kr = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    }
    else if (key.length == 24) {
        kl = key.slice(0, 16);
        for (var i = 0; i < 8; i++) {
            kr[i] = key[i+16];
            kr[i+8] = key[i+16] ^ 0xff;
        }
    }
    else if (key.length == 32) {
        kl = key.slice(0, 16);
        kr = key.slice(16, 32);
    }
    else {
        throw "wrong key length: key must be 128, 192 or 256 bit";
    }

    ka = this._xor_block(kl, kr, 16);
    this._feistel(ka, 8, ka, this.SIGMA1);
    this._feistel(ka, 0, ka.slice(8, 16), this.SIGMA2);
    ka = this._xor_block(kl, ka, 16); 

    this._feistel(ka, 8, ka.slice(0, 8), this.SIGMA3);
    this._feistel(ka, 0, ka.slice(8, 16), this.SIGMA4);

    if (key.length == 16) {
        this._rot_shift(this.kw, 0, kl, 0, 16);
    
        this._rot_shift(this.k, 0, ka, 0, 16);
        this._rot_shift(this.k, 8*2, kl, 15, 16);
        this._rot_shift(this.k, 8*4, ka, 15, 16);
    
        this._rot_shift(this.kl, 0, ka, 30, 16);
    
        this._rot_shift(this.k, 8*6, kl, 45, 16);
        this._rot_shift(this.k, 8*8, ka, 45, 16);
        this._rot_shift(this.k, 8*9, kl, 60, 16);
        this._move(this.k, 8*9, this.k.slice(8*10, 8*10+8), 0, 8);
        this._rot_shift(this.k, 8*10, ka, 60, 16);
    
        this._rot_shift(this.kl, 8*2, kl, 77, 16);
    
        this._rot_shift(this.k, 8*12, kl, 94, 16);
        this._rot_shift(this.k, 8*14, ka, 94, 16);
        this._rot_shift(this.k, 8*16, kl, 111, 16);
    
        this._rot_shift(this.kw, 8*2, ka, 111, 16);
    }
    else {
        var kb = this._xor_block(kr, ka, 16);
        this._feistel(kb, 8, kb.slice(0, 8), this.SIGMA5);
        this._feistel(kb, 0, kb.slice(8, 16), this.SIGMA6);

        this._rot_shift(this.kw, 0, kl, 0, 16);

        this._rot_shift(this.k, 0, kb, 0, 16);
        this._rot_shift(this.k, 8*2, kr, 15, 16);
        this._rot_shift(this.k, 8*4, ka, 15, 16);

        this._rot_shift(this.kl, 0, kr, 30, 16);

        this._rot_shift(this.k, 8*6, kb, 30, 16);
        this._rot_shift(this.k, 8*8, kl, 45, 16);
        this._rot_shift(this.k, 8*10, ka, 45, 16);

        this._rot_shift(this.kl, 8*2, kl, 60, 16);

        this._rot_shift(this.k, 8*12, kr, 60, 16);
        this._rot_shift(this.k, 8*14, kb, 60, 16);
        this._rot_shift(this.k, 8*16, kl, 77, 16);

        this._rot_shift(this.kl, 8*4, ka, 77, 16);

        this._rot_shift(this.k, 8*18, kr, 94, 16);
        this._rot_shift(this.k, 8*20, ka, 94, 16);
        this._rot_shift(this.k, 8*22, kl, 111, 16);

        this._rot_shift(this.kw, 8*2, kb, 111, 16);
    }
};


PACKAGE.prototype._flayer = function (dist, x, k) {
    this._move(dist, 0, x, 0, 8);
    dist[4+0] ^= (((x[0] & k[0]) << 1) & 0xff) ^ (x[1] & k[1]) >> 7;
    dist[4+1] ^= (((x[1] & k[1]) << 1) & 0xff) ^ (x[2] & k[2]) >> 7;
    dist[4+2] ^= (((x[2] & k[2]) << 1) & 0xff) ^ (x[3] & k[3]) >> 7;
    dist[4+3] ^= (((x[3] & k[3]) << 1) & 0xff) ^ (x[0] & k[0]) >> 7;
    dist[0] ^= dist[4+0] | k[4+0];
    dist[1] ^= dist[4+1] | k[4+1];
    dist[2] ^= dist[4+2] | k[4+2];
    dist[3] ^= dist[4+3] | k[4+3];
};


PACKAGE.prototype._flayer_1 = function (dist, x, k) {
    this._move(dist, 0, x, 0, 8);
    dist[0] ^= x[4+0] | k[4+0];
    dist[1] ^= x[4+1] | k[4+1];
    dist[2] ^= x[4+2] | k[4+2];
    dist[3] ^= x[4+3] | k[4+3];
    dist[4+0] ^= (((dist[0] & k[0]) << 1) & 0xff) ^ (dist[1] & k[1]) >> 7;
    dist[4+1] ^= (((dist[1] & k[1]) << 1) & 0xff) ^ (dist[2] & k[2]) >> 7;
    dist[4+2] ^= (((dist[2] & k[2]) << 1) & 0xff) ^ (dist[3] & k[3]) >> 7;
    dist[4+3] ^= (((dist[3] & k[3]) << 1) & 0xff) ^ (dist[0] & k[0]) >> 7;

};


PACKAGE.prototype.encrypt = function (src) {
    var l = new Array(8);
    var r = new Array(8);
    l = src.slice(0, 8);
    r = src.slice(8, 16);

    l = this._xor_block(l, this.kw.slice(0, 8), 8);
    r = this._xor_block(r, this.kw.slice(8, 16), 8);
    if (this.key_length == 16) {
        for (var i = 0; i < 18; i += 2) {
            this._feistel(r, 0, l, this.k.slice(8*i, (8*i)+8));
            this._feistel(l, 0, r, this.k.slice(8*(i+1), 8*(i+1)+8));
            if (i == 4) {
                this._flayer(l, l, this.kl, 0);
                this._flayer_1(r, r, this.kl.slice(8, 16), 0);
            }
            else if (i == 10) {
                this._flayer(l, l, this.kl.slice(16, 24), 0);
                this._flayer_1(r, r, this.kl.slice(24, 32), 0);
            }
        }
    }
    else {
        for (var i = 0; i < 24; i += 2) {
            this._feistel(r, 0, l, this.k.slice(8*i, (8*i)+8));
            this._feistel(l, 0, r, this.k.slice(8*(i+1), 8*(i+1)+8));
            if (i == 4) {
                this._flayer(l, l, this.kl, 0);
                this._flayer_1(r, r, this.kl.slice(8, 16), 0);
            }
            else if (i == 10) {
                this._flayer(l, l, this.kl.slice(16, 24), 0);
                this._flayer_1(r, r, this.kl.slice(24, 32), 0);
            }
            else if (i == 16) {
                this._flayer(l, l, this.kl.slice(32, 40), 0);
                this._flayer_1(r, r, this.kl.slice(40, 48), 0);
            }
        }
    }
    r = this._xor_block(r, this.kw.slice(16, 24), 8);
    l = this._xor_block(l, this.kw.slice(24, 32), 8);

    return r.concat(l);
};


PACKAGE.prototype.decrypt = function (src) {
    var l = new Array(8);
    var r = new Array(8);

    r = src.slice(0, 8);
    l = src.slice(8, 16);

    r = this._xor_block(r, this.kw.slice(8*2, 8*2+8), 8);
    l = this._xor_block(l, this.kw.slice(8*3, 8*3+8), 8);
    if (this.key_length == 16) {
        for (var i = 16; i >= 0; i -= 2) {
            this._feistel(l, 0, r, this.k.slice(8*(i+1), 8*(i+1)+8));
            this._feistel(r, 0, l, this.k.slice(8*i, (8*i)+8));
            if (i == 12) {
                this._flayer(r, r, this.kl.slice(8*3, 8*3+8), 0);
                this._flayer_1(l, l, this.kl.slice(8*2, 8*2+8), 0);
            }
            else if (i == 6) {
                this._flayer(r, r, this.kl.slice(8*1, 8*1+8), 0);
                this._flayer_1(l, l, this.kl.slice(8*0, 8*0+8), 0);
            }
        }
    }
    else {
        for (var i = 22; i >= 0; i -= 2) {
            this._feistel(l, 0, r, this.k.slice(8*(i+1), 8*(i+1)+8));
            this._feistel(r, 0, l, this.k.slice(8*i, (8*i)+8));
            if (i == 18) {
                this._flayer(r, r, this.kl.slice(8*5, 8*5+8), 0);
                this._flayer_1(l, l, this.kl.slice(8*4, 8*4+8), 0);
            }
            else if (i == 12) {
                this._flayer(r, r, this.kl.slice(8*3, 8*3+8), 0);
                this._flayer_1(l, l, this.kl.slice(8*2, 8*2+8), 0);
            }
            else if (i == 6) {
                this._flayer(r, r, this.kl.slice(8*1, 8*1+8), 0);
                this._flayer_1(l, l, this.kl.slice(8*0, 8*0+8), 0);
            }
        }
    }
    l = this._xor_block(l, this.kw.slice(8*0, 8*0+8), 8);
    r = this._xor_block(r, this.kw.slice(8*1, 8*1+8), 8);

    return l.concat(r);
};


/*
 * Util methods
 */
PACKAGE.prototype._print = function (msg) {
    document.write(msg, "<br />\n");
};


PACKAGE.prototype._print_hex = function (lavel, src, length) {
    document.write(lavel);
    for (var i = 0; i < length; i++) {
        var num = src[i] != null ? src[i].toString(16) : 'xx';
        document.write(num.length == 1 ? ('0' + num) : num);
    }
    document.write("<br />\n");
};

PACKAGE.prototype._move = function (dist, offd, src, offs, len) {
    for (var i = 0; i < len; i++) {
        dist[i+offd] = src[i+offs];
    }
}




/*
 * CryptoModeCBC.js
 */
PACKAGE = CryptoModeCBC = function(cipher, key, iv) {
    this.cipher = cipher;
    this.cipher.setup(key);
    this.iv = iv;
};


PACKAGE.prototype.encrypt = function (plain_text) {
    var pad = this.cipher.blocksize - (plain_text.length % this.cipher.blocksize);
    for (var i = 0; pad <= this.cipher.blocksize && i < pad; i++) {
        plain_text = plain_text.concat(pad);
    }
    var nblocks = Math.floor(plain_text.length / this.cipher.blocksize);
    var block = this.iv.slice(0, this.cipher.blocksize);
    var block2;
    var result = new Array(this.cipher.blocksize*nblocks);
    for (var i = 0; i < nblocks; i++) {
        for (var j = 0; j < this.cipher.blocksize; j++) {
            block[j] ^= plain_text[i*this.cipher.blocksize + j];
        }
        block2 = this.cipher.encrypt(block);
        block = block2;
        for (var l = 0; l < this.cipher.blocksize; l++) {
            result[i*this.cipher.blocksize+l] = block2[l];
        }
    }

    return result;
};


PACKAGE.prototype.decrypt = function (cipher_text) {
    var nblocks = Math.floor(cipher_text.length / this.cipher.blocksize);
    var result = new Array(this.cipher.blocksize * nblocks);
    var block = this.cipher.decrypt(cipher_text.slice(0, this.cipher.blocksize));
    for (var j = 0; j < this.cipher.blocksize; j++) {
        result[j] = block[j] ^= this.iv[j];
    }
    for (var i = 1; i < nblocks; i++) {
        block = this.cipher.decrypt(cipher_text.slice(this.cipher.blocksize * i, this.cipher.blocksize*i+this.cipher.blocksize));
        for (var j = 0; j < this.cipher.blocksize; j++) {
            block[j] ^= cipher_text[this.cipher.blocksize*(i-1)+j];
            result[this.cipher.blocksize*i+j] = block[j];
        }
    }
    var pad = result[result.length - 1];
    if (pad <= this.cipher.blocksize) {
        var cut = true;
        for (var i = result.length - pad; i < result.length; i++) {
            if (result[i] == pad)
                continue;
             cut = false;
        }
        if (cut == true) {
            return result.slice(0, result.length - pad);
        }
    }

    return result;
};



PACKAGE = CryptoUtil = {};
/*
 * en|decode Unicode <-> UTF-8
 * See ftp://ftp.isi.edu/in-notes/rfc2279.txt
 */
PACKAGE.arrayFromString = function (str) {
    var result = new Array();
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (c <= 0x7f) {
            result.push(c);
        }
        else if (c <= 0x07ff) {
            result.push(0xc0 | (c >>> 6));
            result.push(0x80 | (c & 0x3f));
        }
        else if (c <= 0xffff) {
            result.push(0xe0 | ( c >>> 12));
            result.push(0x80 | ((c >>>  6) & 0x3f));
            result.push(0x80 | ( c        & 0x3F));
        }
        else if (c <= 0x1fffff) {
            result.push(0xf0 |  (c >>> 18));
            result.push(0x80 | ((c >>> 12) & 0x3f));
            result.push(0x80 | ((c >>>  6) & 0x3f));
            result.push(0x80 | ( c        & 0x3f));
        }
        else if (c <= 0x03ffffff) {
            result.push(0xf8 |  (c >>> 24));
            result.push(0x80 | ((c >>> 18) & 0x3f));
            result.push(0x80 | ((c >>> 12) & 0x3f));
            result.push(0x80 | ((c >>>  6) & 0x3f));
            result.push(0x80 | ( c        & 0x3f));
        }
        else if (c <= 0x7fffffff) {
            result.push(0xfc |  (c >>> 30));
            result.push(0x80 | ((c >>> 24) & 0x3f));
            result.push(0x80 | ((c >>> 18) & 0x3f));
            result.push(0x80 | ((c >>> 12) & 0x3f));
            result.push(0x80 | ((c >>>  6) & 0x3f));
            result.push(0x80 | ( c        & 0x3f));
        }
        else {
            c = 0xfffd;
            result.push(0xe0 | ( c >> 12));
            result.push(0x80 | ((c >>  6) & 0x3f));
            result.push(0x80 | ( c        & 0x3F));
        }
    }
    return result;
};


PACKAGE.stringFromArray = function (list) {
    var result = new String();
    for (var i = 0; i < list.length; i++) {
        var c = list[i];
        if (c <= 0x07f) {
            result += String.fromCharCode(list[i] & 0x7f);
        }
        else if ((c & 0xe0) == 0xc0) {
            result += String.fromCharCode(  ((list[i]   & 0x1f) << 6)
                                           | (list[i+1] & 0x3f));
            i += 1;
        }
        else if ((c & 0xf0) == 0xe0) {
            result += String.fromCharCode(  (( list[i]   & 0x0f) << 12)
                                           | ((list[i+1] & 0x3f) <<  6)
                                           |  (list[i+2] & 0x3f));
            i += 2;
        }
        else if ((c & 0xf8) == 0xf0) {
            result += String.fromCharCode(  (( list[i]   & 0x07) << 18)
                                           | ((list[i+1] & 0x3f) << 12)
                                           | ((list[i+2] & 0x3f) <<  6)
                                           |  (list[i+3] & 0x3f));
            i += 3;
        }
        else if ((c & 0xfc) == 0xf8) {
            result += String.fromCharCode(  (( list[i]   & 0x03) << 24)
                                           | ((list[i+1] & 0x3f) << 18)
                                           | ((list[i+2] & 0x3f) << 12)
                                           | ((list[i+3] & 0x3f) <<  6)
                                           |  (list[i+4] & 0x3f));
            i += 4;
        }
        else if ((c & 0xfe) == 0xfc) {
            result += String.fromCharCode(  (( list[i]   & 0x01) << 30)
                                           | ((list[i+1] & 0x3f) << 24)
                                           | ((list[i+2] & 0x3f) << 18)
                                           | ((list[i+3] & 0x3f) << 12)
                                           | ((list[i+4] & 0x3f) <<  6)
                                           |  (list[i+5] & 0x3f));
            i += 5;
        }

    }
    return result;
}


PACKAGE.arrayFromHex = function (hex) {
    var res = new Array();
    for (var i = 0; i < hex.length; i += 2) {
        res.push(parseInt('0x' + hex.charAt(i) + hex.charAt(i+1)));
    }
    return res;
};



PACKAGE.hexFromArray = function (list) {
    var res = new String();
    for (var i in list) {
        res += (list[i] > 0xf) ? list[i].toString(16) : '0' + list[i].toString(16);
    }
    return res;
};


PACKAGE.BASE64TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                    + "abcdefghijklmnopqrstuvwxyz"
                    + "0123456789+/";
PACKAGE.base64FromArray = function (list) {
    var mod = list.length % 3;
    var total = (list.length / 3) * 4 + (3 - mod) % 3 + 1;
    total += list.length / 57;
    if ((list.length % 57) > 0)
       total++;

    if (total < list.length)
        return null;
    var i = 0;
    var out = new String();
    while (i < (list.length - mod)) {
        out += PACKAGE.BASE64TABLE.charAt(list[i++] >> 2);
        out += PACKAGE.BASE64TABLE.charAt(((list[i-1] << 4) | (list[i] >> 4)) & 0x3f);
        out += PACKAGE.BASE64TABLE.charAt(((list[i] << 2) | (list[i+1] >> 6)) & 0x3f);
        out += PACKAGE.BASE64TABLE.charAt(list[i+1] & 0x3f);
        i += 2;
        if ((i % 57) == 0)
            out += "\n";
    }
    if (!mod) {
        if ((i % 57) > 0)
           out += "\n";
        return out;
    }
    else {
        out += PACKAGE.BASE64TABLE.charAt(list[i++] >> 2);
        out += PACKAGE.BASE64TABLE.charAt(((list[i-1] << 4) | (list[i] >> 4)) & 0x3f);
        if (mod == 1) {
            out += "==\n";
        }
        else {
            out += PACKAGE.BASE64TABLE.charAt((list[i] << 2) & 0x3f);
            out += "=\n";
        }
        return out;
    }
};


PACKAGE.BASE64REVTABLE = [
  -3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -2, -1, -1,
  -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
  -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 
];
PACKAGE.arrayFromBase64 = function (str) {
    var out = new Array();
    var buf = new Array();
    var p = 0;
    var pad = 0;
    var err = false;
    str = str.replace(/[^a-zA-Z0-9=\/\+]+/g, '');
    while (pad == 0 && str.length >= p) {
        var x = PACKAGE.BASE64REVTABLE[str.charCodeAt(p)];
        p++;
        if (x == -3) {
            if (((p - 1) % 4) > 0)
                err = true;
            return out;
        }
        else if (x == -2) {
            if (((p - 1) % 4) < 2) {
                err = true;
                return out;
            }
            else if (((p - 1) % 4) == 2) {
                if (str.charAt(p) != '=') {
                    err = true;
                    return out;
                }
                buf[2] = 0;
                pad = 2;
            }
            else {
                pad = 1;
            }
        }
        else if (x == -1) {
            err = true;
            return out;
        }
        else {
            var y = (p - 1) % 4;
            if (y == 0) {
                buf[0] = (x << 2) & 0xff;
            }
            else if (y == 1) {
                buf[0] |= (x >>> 4) & 0xff;
                buf[1]  = (x << 4) & 0xff;
            }
            else if (y == 2) {
                buf[1] |= (x >>> 2) & 0xff;
                buf[2]  = (x << 6) & 0xff;
            }
            else if (y == 3) {
                buf[2] |= x & 0xff;
                for (var i = 0; i < (3 - pad); i++)
                    out.push(buf[i]);
            }
        }
    }
    for (var i = 0; i < (3 - pad); i++)
        out.push(buf[i]);
    return out;
};

