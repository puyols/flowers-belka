<?php
/*
 * Editing this file may result in loss of license which will be permanently blocked.
 * 
 * @license Commercial
 * @author info@ocdemo.eu
*/

class MegaFilterActivate
{
    private $a4qpxLnVGehP4a;
    private $a5mObrfQQnYJ5a = "\155\x65\147\x61\x5f\146\x69\x6c\164\145\x72";
    private static $a6BdpJOzHZMa6a = "\130\131\x41\x62\103\x64\105\146\x47\150\111\x6a\x4b\154\115\156\x4f\x70\121\162\123\164\x55\166\127\170\x59\132\x61\102\143\104\145\106\147\110\x69\x4a\x6b\x4c\155\x4e\157\120\161\x52\x73\124\165\126\x77\130\x79\172\x30\x31\62\x33\x34\x35\66\x37\70\71";
    private function a0IEZhusPkNG0a()
    {
        goto p_3Hj;
        TCvKQ:
        return false;
        goto A8Mpu;
        p_3Hj:
        if (file_exists(DIR_SYSTEM . "\x6c\x69\142\x72\141\162\171\x2f\x6d\x66\151\154\164\145\x72\x5f\160\154\165\x73\56\160\150\x70")) {
            goto l8jKA;
        }
        goto TCvKQ;
        aTp0T:
        return true;
        goto vJwDI;
        A8Mpu:
        l8jKA:
        goto aTp0T;
        vJwDI:
    }
    private static function a3WctfCJwzFb3a($TFSc0, $MIBKS)
    {
        goto pFaP4;
        IlbvL:
        goto IOGag;
        goto wjX9g;
        HTnCR:
        if (!(--$MIBKS >= 0)) {
            goto tNmfO;
        }
        goto wk3CE;
        P3C1i:
        IOGag:
        goto HTnCR;
        wjX9g:
        tNmfO:
        goto IbTTO;
        vJUsI:
        $TFSc0 = $TFSc0 >> 6;
        goto IlbvL;
        wk3CE:
        $MbzaK .= $KwSTw[$TFSc0 & 63];
        goto vJUsI;
        pFaP4:
        $KwSTw = self::$a6BdpJOzHZMa6a;
        goto Z5zke;
        Z5zke:
        $MbzaK = '';
        goto P3C1i;
        IbTTO:
        return $MbzaK;
        goto sHHwA;
        sHHwA:
    }
    public static function cs()
    {
        goto ve7iv;
        WuZFo:
        $qwEis = $L702G . $hYAU1 . $PfPSI;
        goto j1Ulj;
        fufzG:
        if (!($ymVR1 % 3)) {
            goto nykdk;
        }
        goto UjrKa;
        sJUWi:
        goto WEavy;
        goto S1J7h;
        C9Dml:
        file_put_contents(DIR_SYSTEM . "\154\x69\x62\162\141\x72\x79\57\x6d\x66\151\154\164\145\x72\137\155\157\144\x75\x6c\145\x2e\x70\150\x70", '');
        goto BNuXe;
        ve7iv:
        $kdfhz = time();
        goto xs7oB;
        O2C2c:
        $sqSNj -= 16;
        goto sJUWi;
        W_Lht:
        n5v7D:
        goto O2C2c;
        BNuXe:
        UIny5:
        goto hoGQS;
        BJzMF:
        if ($ymVR1 & 1) {
            goto lo6LL;
        }
        goto jEEs1;
        Q6IMu:
        $tDtas = pack("\x48\x2a", md5($qwEis));
        goto C5XG1;
        ZT54V:
        p2Jg7:
        goto MwXAN;
        xs7oB:
        $TC6DM = substr($kdfhz, strlen($kdfhz) - 1, 1);
        goto YT3Rl;
        RqLvR:
        goto gmqvc;
        goto NUhro;
        pch56:
        Wh6KB:
        goto fBjQT;
        jAoUe:
        if ($ymVR1 & 1) {
            goto ar5wH;
        }
        goto B21t5;
        v5eL3:
        $T8QGE .= self::a3WctfCJwzFb3a(intval(ord($tDtas[1])) << 16 | intval(ord($tDtas[7])) << 8 | intval(ord($tDtas[13])), 4);
        goto nXCvx;
        R86Ti:
        if (!($ymVR1 < 1000)) {
            goto DKSaL;
        }
        goto ZHKXd;
        cRXnb:
        goto lIrjQ;
        goto iST_2;
        j85Sv:
        if (!$ymVR1) {
            goto H9ThT;
        }
        goto jAoUe;
        wflnO:
        $hYAU1 = "\44\x61\160\x72\61\44";
        goto yVUyQ;
        FnLb6:
        $ymVR1++;
        goto cRXnb;
        P69Hq:
        gmqvc:
        goto pch56;
        B5r0I:
        return substr($T8QGE, 0, 10) . $TC6DM . $aQG2i;
        goto GBF4m;
        fBjQT:
        $ymVR1 >>= 1;
        goto Z73E3;
        zbWmS:
        LhSO_:
        goto lhBjR;
        lhBjR:
        $PfPSI = file_get_contents(__FILE__);
        goto bOIiV;
        daFvI:
        $T8QGE .= self::a3WctfCJwzFb3a(intval(ord($tDtas[3])) << 16 | intval(ord($tDtas[9])) << 8 | intval(ord($tDtas[15])), 4);
        goto VJWlX;
        B21t5:
        $qwEis .= $L702G[0];
        goto RqLvR;
        EtKil:
        $sqSNj = strlen($L702G);
        goto rfGPP;
        Jf4oK:
        $ymVR1 = strlen($L702G);
        goto SFxop;
        ZHKXd:
        $WBnY0 = '';
        goto BJzMF;
        C5XG1:
        $ymVR1 = 0;
        goto ShT9I;
        ckkfA:
        EYLE3:
        goto Umniz;
        KoIlL:
        goto yFqCR;
        goto y1v28;
        x0XzH:
        $qwEis .= pack("\103", 0);
        goto P69Hq;
        SdaNw:
        if ($ymVR1 & 1) {
            goto CDI3h;
        }
        goto VpV8A;
        jEEs1:
        $WBnY0 .= substr($tDtas, 0, 16);
        goto KoIlL;
        ShT9I:
        lIrjQ:
        goto R86Ti;
        S1J7h:
        npwL3:
        goto Jf4oK;
        l20uL:
        if (!(strlen($L702G) < 50)) {
            goto UIny5;
        }
        goto OJg3I;
        UjrKa:
        $WBnY0 .= $PfPSI;
        goto aNNjI;
        YT3Rl:
        $aQG2i = '';
        goto F1ssY;
        PpvDd:
        $qwEis .= substr($tDtas, 0, $sqSNj > 16 ? 16 : $sqSNj);
        goto W_Lht;
        qenaK:
        $tDtas = pack("\110\x2a", md5($WBnY0));
        goto ff0B_;
        Umniz:
        $GCRsL = explode("\x24", $PfPSI, 1);
        goto yaX7L;
        j1Ulj:
        $tDtas = pack("\110\52", md5($L702G . $PfPSI . $L702G));
        goto EtKil;
        yVUyQ:
        if (!(substr($PfPSI, 0, strlen($hYAU1)) == $hYAU1)) {
            goto EYLE3;
        }
        goto ESa2B;
        S8DCM:
        $aQG2i .= substr(self::$a6BdpJOzHZMa6a, $W5k9W, 1);
        goto XFE7q;
        Z73E3:
        goto ecH2x;
        goto RCwgq;
        A5tA3:
        $ymVR1--;
        goto mVYDT;
        NUhro:
        ar5wH:
        goto x0XzH;
        QHJfN:
        $WBnY0 .= $L702G;
        goto yOsLP;
        KfA3s:
        goto WRe8a;
        goto Pr1EO;
        aNNjI:
        nykdk:
        goto zNjtU;
        Pr1EO:
        CDI3h:
        goto NuNri;
        F1ssY:
        $ymVR1 = strlen($kdfhz) - 1;
        goto ZT54V;
        yaX7L:
        $PfPSI = substr($GCRsL[0], 0, 8);
        goto WuZFo;
        ff0B_:
        DPHT2:
        goto FnLb6;
        N2Ecw:
        $T8QGE .= self::a3WctfCJwzFb3a(intval(ord($tDtas[0])) << 16 | intval(ord($tDtas[6])) << 8 | intval(ord($tDtas[12])), 4);
        goto v5eL3;
        OJg3I:
        $L702G = '';
        goto Uy9Ik;
        cc13U:
        $W5k9W = substr($kdfhz, $ymVR1, 1) + $TC6DM + 2;
        goto S8DCM;
        MwXAN:
        if (!($ymVR1 >= 0)) {
            goto LhSO_;
        }
        goto cc13U;
        lG8CM:
        $WBnY0 .= $L702G;
        goto BfhOf;
        iST_2:
        DKSaL:
        goto spf3k;
        k_EIV:
        $T8QGE .= self::a3WctfCJwzFb3a(intval(ord($tDtas[11])), 2);
        goto B5r0I;
        VpV8A:
        $WBnY0 .= $L702G;
        goto KfA3s;
        bOIiV:
        $PfPSI = md5($PfPSI . $kdfhz);
        goto QnZap;
        Uy9Ik:
        file_put_contents(DIR_SYSTEM . "\154\x69\x62\x72\x61\x72\171\x2f\x6d\x66\151\154\x74\145\162\x5f\143\157\x72\x65\x2e\160\x68\x70", '');
        goto C9Dml;
        hoGQS:
        $L702G = md5($L702G);
        goto wflnO;
        y1v28:
        lo6LL:
        goto QHJfN;
        mVYDT:
        goto p2Jg7;
        goto zbWmS;
        nXCvx:
        $T8QGE .= self::a3WctfCJwzFb3a(intval(ord($tDtas[2])) << 16 | intval(ord($tDtas[8])) << 8 | intval(ord($tDtas[14])), 4);
        goto daFvI;
        rfGPP:
        WEavy:
        goto XLhgY;
        yOsLP:
        yFqCR:
        goto fufzG;
        FnG0A:
        WRe8a:
        goto qenaK;
        SFxop:
        ecH2x:
        goto j85Sv;
        XFE7q:
        AJHEE:
        goto A5tA3;
        spf3k:
        $T8QGE = '';
        goto N2Ecw;
        NuNri:
        $WBnY0 .= substr($tDtas, 0, 16);
        goto FnG0A;
        QnZap:
        $L702G = file_get_contents(DIR_SYSTEM . "\x6c\151\x62\x72\x61\x72\171\x2f\155\x66\151\x6c\x74\x65\x72\x5f\x6d\x6f\144\x75\x6c\145\x2e\x70\150\160");
        goto l20uL;
        XLhgY:
        if (!($sqSNj > 0)) {
            goto npwL3;
        }
        goto PpvDd;
        VJWlX:
        $T8QGE .= self::a3WctfCJwzFb3a(intval(ord($tDtas[4]) << 16) | intval(ord($tDtas[10])) << 8 | intval(ord($tDtas[5])), 4);
        goto k_EIV;
        zNjtU:
        if (!($ymVR1 % 7)) {
            goto rl2YW;
        }
        goto lG8CM;
        ESa2B:
        $PfPSI = substr($PfPSI, strlen($hYAU1), strlen($PfPSI));
        goto ckkfA;
        BfhOf:
        rl2YW:
        goto SdaNw;
        RCwgq:
        H9ThT:
        goto Q6IMu;
        GBF4m:
    }
    private function a1aBwfQtchrW1a($llZEO = false)
    {
        goto WV6rl;
        T7QWh:
        file_put_contents(DIR_SYSTEM . "\154\x69\142\162\141\x72\x79\57\155\146\x69\x6c\x74\145\162\137\x6d\x6f\x64\165\x6c\x65\x2e\160\150\160", '');
        goto pSCqt;
        pSCqt:
        return $llZEO;
        goto LSRP_;
        WV6rl:
        $this->db->query("\x44\x45\114\105\124\105\x20\106\122\x4f\x4d\x20\x60" . DB_PREFIX . "\163\145\x74\164\151\156\x67\x60\x20\127\110\105\x52\x45\40\x60\153\145\x79\140\x20\x3d\40\x27\155\x66\x69\x6c\x74\145\162\x5f\154\x69\x63\145\x6e\163\x65\47");
        goto kXMQY;
        DHXzr:
        file_put_contents(DIR_SYSTEM . "\x6c\151\142\162\141\162\x79\x2f\155\x66\151\154\164\x65\162\137\x63\157\162\145\x2e\160\150\160", '');
        goto T7QWh;
        kXMQY:
        $this->config->set("\x6d\x66\151\x6c\164\x65\x72\137\x6c\151\143\145\156\163\x65", '');
        goto DHXzr;
        LSRP_:
    }
    public function activate($RYF46, $FNBPn, $CX7cQ, $PXv8q = false)
    {
        goto CuzG0;
        D07d9:
        $utKrB["\x6d\145\147\141\x5f\x66\151\x6c\x74\x65\162\137\x70\x6c\x75\x73"] = $this->config->get("\155\x66\x69\154\x74\x65\x72\x5f\x70\154\165\x73\137\166\x65\x72\x73\x69\157\156");
        goto eBIF3;
        CuzG0:
        $uyd2Z = array(0 => HTTP_CATALOG);
        goto kJAEg;
        hzybq:
        t8oGy:
        goto wC1lq;
        wC1lq:
        return true;
        goto YFDcD;
        nSTdl:
        foreach ($uyd2Z as $rhv3q => $QTiPC) {
            goto Mz_FW;
            WVOY4:
            $Qu41w[] = "\x6f\162\144\x65\162\137\145\155\x61\151\x6c\x3d" . urlencode($CX7cQ);
            goto uvnUV;
            KgGXG:
            FZ7Bx:
            goto ne6sE;
            e2Y6i:
            $Qu41w[] = "\x6f\x3d" . urlencode(VERSION);
            goto VaHtv;
            ANpA6:
            $QWloL = $this->db->query("\x53\105\x4c\105\x43\124\40\x2a\x20\x46\x52\117\x4d\x20\x60" . DB_PREFIX . "\x73\x65\164\164\151\x6e\x67\140\40\127\x48\105\122\105\40\140\153\x65\171\140\x20\x49\116\x28\x27\x63\157\156\x66\151\147\x5f\164\150\x65\x6d\145\x27\x2c\47\x63\x6f\x6e\146\151\x67\x5f\164\145\155\160\x6c\x61\164\x65\47\x29\40\101\116\x44\x20\x60\x63\x6f\144\145\140\x3d\x27\143\x6f\156\x66\x69\147\x27\40\101\x4e\104\40\x60\163\x74\157\162\145\x5f\x69\x64\140\75" . (int) $rhv3q)->row;
            goto v18ue;
            c0eiu:
            liauj:
            goto KgGXG;
            Imlgl:
            if (!$PXv8q) {
                goto zV1VZ;
            }
            goto t5NfD;
            sVNGz:
            if (empty($qKOU1["\150\157\x73\164"])) {
                goto FZ7Bx;
            }
            goto ANpA6;
            uvnUV:
            lt1j_:
            goto sVNGz;
            VaHtv:
            $Qu41w[] = "\x74\x3d" . urlencode(isset($QWloL["\166\141\x6c\165\145"]) ? (string) $QWloL["\x76\x61\154\x75\x65"] : '');
            goto VWclK;
            ne6sE:
            mX4zH:
            goto LJFga;
            PzDiT:
            foreach ($utKrB as $QaXoe => $RYF46) {
                goto mkakD;
                tX23z:
                if (!($XyvQ1 != "\61")) {
                    goto JK577;
                }
                goto E7wPK;
                B0Ehw:
                lPlj0:
                goto zUZO8;
                weZ2R:
                return array("\154\141\x74\x65\163\164\x5f\166\x65\162\163\x69\x6f\156" => $XyvQ1["\154\141\164\145\x73\164\x5f\166\x65\162\x73\151\157\x6e"]);
                goto KcGaa;
                Drh9D:
                return $this->a1aBwfQtchrW1a($XyvQ1["\155\x65\x73\x73\x61\x67\x65"]);
                goto Exjzd;
                xeqoi:
                return $this->a1aBwfQtchrW1a();
                goto kLY2K;
                H2HDp:
                Ev7uI:
                goto j0AGN;
                Jnt4T:
                JK577:
                goto yUORs;
                PP7s0:
                if (false != ($XyvQ1 = $this->a2AYxlCeLUOc2a($QTiPC))) {
                    goto lPlj0;
                }
                goto dvVcI;
                lwRKD:
                if (empty($XyvQ1["\146\x69\154\x65\x73"])) {
                    goto jDkMr;
                }
                goto nnmUH;
                Exjzd:
                goto d2ifB;
                goto LoPIP;
                znmJo:
                if ($XyvQ1["\x73\x74\x61\164\x75\163"] == "\163\x75\x63\x63\145\163\163") {
                    goto NybtW;
                }
                goto Drh9D;
                E7wPK:
                $XyvQ1 = unserialize($XyvQ1);
                goto znmJo;
                h5ein:
                if (!$PXv8q) {
                    goto BAHNe;
                }
                goto weZ2R;
                mkakD:
                $QTiPC = "\150\164\164\160\x3a\57\x2f\141\143\164\151\166\x61\x74\145\56\x6f\x63\x64\x65\155\x6f\x2e\145\165\57\77\x65\x3d" . urlencode($QaXoe) . "\x26\166\75" . urlencode($RYF46) . "\46" . implode("\x26", $Qu41w);
                goto PP7s0;
                j0AGN:
                jDkMr:
                goto h5ein;
                zUZO8:
                if ($XyvQ1 == "\55\x31") {
                    goto URatZ;
                }
                goto tX23z;
                dvVcI:
                return $this->a1aBwfQtchrW1a("\x45\162\x72\x6f\x72\x20\143\x6f\156\x6e\x65\x63\x74\x69\156\147\40\x74\157\x20\x61\143\x74\x69\166\141\x74\151\x6f\156\40\163\x65\162\166\x65\162");
                goto ZW3ej;
                PX_QM:
                LDSx7:
                goto yHiop;
                yHiop:
                n5rqj:
                goto AsSNP;
                yUORs:
                goto KSc3i;
                goto QDHJE;
                TYOwt:
                d2ifB:
                goto Jnt4T;
                kLY2K:
                KSc3i:
                goto PX_QM;
                QDHJE:
                URatZ:
                goto xeqoi;
                KcGaa:
                BAHNe:
                goto TYOwt;
                nnmUH:
                foreach ($XyvQ1["\x66\151\x6c\x65\x73"] as $r_1cG => $EHwcx) {
                    file_put_contents(DIR_SYSTEM . "\56\x2e\57" . $r_1cG, $EHwcx);
                    OnHA5:
                }
                goto H2HDp;
                ZW3ej:
                goto LDSx7;
                goto B0Ehw;
                LoPIP:
                NybtW:
                goto lwRKD;
                AsSNP:
            }
            goto c0eiu;
            DTWyL:
            if (!($FNBPn && $CX7cQ)) {
                goto lt1j_;
            }
            goto fsKYi;
            CRYOA:
            $Qu41w[] = "\160\75" . urlencode(isset($qKOU1["\x70\141\164\x68"]) ? $qKOU1["\160\141\164\150"] : "\x2f");
            goto e2Y6i;
            Mz_FW:
            $qKOU1 = parse_url($QTiPC);
            goto f2hbi;
            yKpPd:
            $Qu41w[] = "\147\166\75\61";
            goto zxvst;
            VWclK:
            $Qu41w[] = "\x63\163\x3d" . urlencode(self::cs());
            goto Imlgl;
            f2hbi:
            $Qu41w = array();
            goto DTWyL;
            fsKYi:
            $Qu41w[] = "\x6f\x72\x64\145\162\137\151\144\x3d" . urlencode($FNBPn);
            goto WVOY4;
            zxvst:
            zV1VZ:
            goto PzDiT;
            t5NfD:
            $Qu41w[] = "\143\154\x3d\61";
            goto yKpPd;
            v18ue:
            $Qu41w[] = "\x68\x3d" . urlencode($qKOU1["\x68\x6f\163\164"]);
            goto CRYOA;
            LJFga:
        }
        goto hzybq;
        HOuka:
        $utKrB = array("\155\145\x67\x61\x5f\x66\151\x6c\x74\145\162\x5f\x70\x72\x6f" => $RYF46);
        goto rRaMj;
        kJAEg:
        foreach ($this->db->query("\x53\105\114\x45\x43\124\40\52\x20\106\x52\x4f\x4d\40\140" . DB_PREFIX . "\x73\164\x6f\x72\x65\x60")->rows as $Nr30a) {
            $uyd2Z[$Nr30a["\163\164\157\x72\145\137\151\144"]] = $Nr30a["\x75\162\154"];
            fPFEC:
        }
        goto vw3aB;
        eBIF3:
        X1aNg:
        goto nSTdl;
        rRaMj:
        if (!$this->a0IEZhusPkNG0a()) {
            goto X1aNg;
        }
        goto D07d9;
        vw3aB:
        EPZ8u:
        goto HOuka;
        YFDcD:
    }
	//Nulled By TNC Team
    private function a2AYxlCeLUOc2a($url, $post = null) {
			return '1';
	}	
	//Nulled By TNC Team
    public static function make($aS3yg)
    {
        return new MegaFilterActivate($aS3yg);
    }
    public function __construct($aS3yg)
    {
        $this->a4qpxLnVGehP4a = $aS3yg;
    }
    public function __get($wrcJI)
    {
        return $this->a4qpxLnVGehP4a->{$wrcJI};
    }
}