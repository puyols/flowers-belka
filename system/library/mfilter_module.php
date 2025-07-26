<?php
/*
 * Editing this file may result in loss of license which will be permanently blocked.
 * 
 * @license Commercial
 * @author info@ocdemo.eu
*/

class MegaFilterModule
{
    private $a4tdqSKCEjyr4a;
    private $a5CXdpESIGYj5a = array();
    private static $a6WKNjZstphB6a = false;
    private function a0KNdObCCIUz0a($EEo8Z)
    {
        goto dEeGI;
        nQm9r:
        return $AVBJW;
        goto Hz96U;
        dEeGI:
        $AVBJW = array();
        goto PMaQr;
        eAqvq:
        YFnRw:
        goto nQm9r;
        PMaQr:
        foreach ($EEo8Z as $dUjTQ => $HPIBS) {
            $AVBJW[$HPIBS["\163\x65\157\137\x6e\141\x6d\x65"]] = $dUjTQ;
            X_EoQ:
        }
        goto eAqvq;
        Hz96U:
    }
    private function a1OkdYsKmEat1a($Yw_EK, $U2kO6 = false)
    {
        goto o1gyf;
        VCbA3:
        self::$a6WKNjZstphB6a = true;
        goto jecmd;
        Bi7d1:
        echo "\74\142\162\x20\57\x3e\x3c\142\162\40\x2f\x3e";
        goto QJdyG;
        Sk940:
        OFIuH:
        goto sqhic;
        o1gyf:
        if (!self::$a6WKNjZstphB6a) {
            goto OFIuH;
        }
        goto lRM62;
        ii6vM:
        echo "\74\141\40\150\162\145\146\x3d\x22\x68\164\164\x70\163\x3a\x2f\x2f\x67\x69\164\x68\x75\142\56\x63\157\155\57\x76\x71\155\x6f\x64\57\166\x71\x6d\157\x64\57\167\x69\x6b\x69\57\x49\156\x73\164\141\154\x6c\x69\156\147\x2d\x76\x51\x6d\x6f\x64\55\x6f\156\55\x4f\160\145\156\x43\x61\162\164\x22\x20\x74\x61\162\x67\145\x74\x3d\x22\x5f\x62\x6c\x61\x6e\153\x22\76\x48\x6f\x77\x20\x74\x6f\40\x69\x6e\163\x74\x61\154\x6c\154\x20\x56\121\115\157\x64\74\57\x61\76";
        goto fzxCU;
        fzxCU:
        Om3HC:
        goto N0Ffd;
        lRM62:
        return;
        goto Sk940;
        QJdyG:
        echo "\120\154\145\x61\163\145\x20\x3c\x61\40\x68\162\145\146\x3d\42\x68\164\x74\x70\163\72\57\57\147\151\164\x68\x75\142\56\143\157\x6d\57\x76\161\x6d\157\144\57\166\x71\155\x6f\144\57\162\145\x6c\145\141\163\x65\x73\x2f\x74\x61\x67\57\x76\x32\56\x36\56\x31\x2d\x6f\160\145\156\x63\141\162\164\x22\40\164\x61\x72\x67\x65\164\x3d\x22\137\x62\x6c\141\156\x6b\42\x3e\x64\x6f\x77\x6e\154\157\141\x64\40\126\121\x4d\157\x64\74\57\x61\x3e\x20\141\x6e\144\40\x72\x65\x61\144\x20";
        goto ii6vM;
        VpABa:
        echo $Yw_EK;
        goto dLJ5i;
        N0Ffd:
        echo "\x3c\x2f\144\x69\166\76";
        goto VCbA3;
        sqhic:
        echo "\74\144\x69\166\40\163\164\x79\154\x65\x3d\x22\x70\141\144\x64\151\156\x67\72\40\61\x30\160\x78\73\x20\164\145\x78\164\55\141\x6c\x69\147\x6e\72\40\x63\145\156\164\x65\162\x22\76";
        goto VpABa;
        dLJ5i:
        if (!$U2kO6) {
            goto Om3HC;
        }
        goto Bi7d1;
        jecmd:
    }
    private function a2aGukWUZiqu2a($hToE3)
    {
        goto lskHE;
        b80jg:
        $ttpGx = isset($_SERVER["\x48\x54\124\x50\x5f\x48\117\123\124"]) ? $_SERVER["\110\x54\124\x50\137\110\x4f\x53\124"] : $_SERVER["\123\105\x52\126\105\122\137\x4e\x41\x4d\x45"];
        goto noJal;
        noJal:
        $ALMTT = parse_url($hToE3);
        goto YnNMf;
        lskHE:
        $lgpyE = isset($_SERVER["\110\x54\124\120\123"]) && $_SERVER["\x48\x54\124\x50\x53"] == "\x6f\156" ? "\x68\x74\x74\x70\x73" : "\150\x74\x74\160";
        goto b80jg;
        YnNMf:
        return $lgpyE . "\72\x2f\57" . $ttpGx . $ALMTT["\x70\x61\x74\x68"] . (empty($ALMTT["\161\165\145\x72\171"]) ? '' : "\x3f" . str_replace("\x26\141\x6d\160\x3b", "\46", $ALMTT["\161\165\145\x72\x79"]));
        goto bBPRH;
        bBPRH:
    }
    public static function newInstance(&$Os19d)
    {
        return new self($Os19d);
    }
    private function a3RhsknXtGQk3a($hToE3, $ECWUj = null)
    {
        goto XQtWT;
        ei6JS:
        curl_setopt($IWAdr, CURLOPT_POST, true);
        goto EOH_o;
        bW2Dk:
        curl_setopt($IWAdr, CURLOPT_SSL_VERIFYHOST, 0);
        goto xYQ6o;
        TU1O0:
        curl_close($IWAdr);
        goto O6YHX;
        EOH_o:
        curl_setopt($IWAdr, CURLOPT_POSTFIELDS, $ECWUj);
        goto gmN3H;
        xYQ6o:
        if (empty($ECWUj)) {
            goto VPCrx;
        }
        goto ei6JS;
        yRs_z:
        HamM7:
        goto oJHLw;
        O6YHX:
        return $ceJ02;
        goto QKePL;
        kLGnR:
        curl_setopt($IWAdr, CURLOPT_RETURNTRANSFER, 1);
        goto rZgZf;
        hdAot:
        OpHHW:
        goto rPvSa;
        gmN3H:
        VPCrx:
        goto YR5Yh;
        MUBVB:
        curl_setopt($IWAdr, CURLOPT_URL, $hToE3);
        goto kLGnR;
        rPvSa:
        $IWAdr = curl_init();
        goto MUBVB;
        LXS95:
        if (!(false != ($jPvhy = file_get_contents($hToE3)))) {
            goto HamM7;
        }
        goto zJhZl;
        XQtWT:
        if (function_exists("\x63\x75\x72\x6c\137\151\x6e\x69\164")) {
            goto OpHHW;
        }
        goto LXS95;
        oJHLw:
        return false;
        goto hdAot;
        YR5Yh:
        $ceJ02 = curl_exec($IWAdr);
        goto TU1O0;
        rZgZf:
        curl_setopt($IWAdr, CURLOPT_SSL_VERIFYPEER, false);
        goto bW2Dk;
        zJhZl:
        return $jPvhy;
        goto yRs_z;
        QKePL:
    }
    private function __construct(&$Os19d)
    {
        goto o0Qt1;
        JDoDx:
        $c9GgV = array(0 => HTTP_SERVER);
        goto BhZ8a;
        VTyha:
        $nuxZn = array("\155\x65\147\x61\x5f\x66\x69\154\164\x65\x72\x5f\160\162\x6f" => $this->config->get("\155\146\151\x6c\x74\145\x72\137\x76\145\162\x73\x69\x6f\156"));
        goto uVS3n;
        sXCO2:
        $dNmF3["\x74\151\x6d\145"] = time();
        goto QuyZ2;
        NSgv8:
        ETl3w:
        goto NZviA;
        s0AGG:
        $vplj1 = md5($vplj1);
        goto eIgJQ;
        hD_ia:
        Jkcr2:
        goto UbHsG;
        Pphkd:
        T27Gw:
        goto HauuW;
        pkGJN:
        e0NYO:
        goto jBrd1;
        BO2CI:
        $this->db->query("\x44\105\114\105\x54\x45\40\x46\x52\117\x4d\x20\x60" . DB_PREFIX . "\x73\x65\x74\x74\151\156\x67\140\40\127\110\x45\x52\x45\x20\140\x6b\x65\171\140\x20\75\x20\x27\x6d\x66\151\x6c\164\145\x72\x5f\154\x69\143\x65\x6e\x73\145\47");
        goto l5spN;
        asHAE:
        $dQzmN = file_get_contents(DIR_SYSTEM . "\x6c\x69\x62\162\x61\x72\171\57\155\x66\151\154\164\x65\162\137\143\157\162\145\56\160\150\x70");
        goto PNBF5;
        PNBF5:
        $dQzmN = md5($dQzmN);
        goto OWlKi;
        Wwd9A:
        die(MegaFilterActivate::cs());
        goto Pphkd;
        uVS3n:
        if (!file_exists(DIR_SYSTEM . "\154\x69\x62\x72\x61\x72\171\x2f\155\146\x69\x6c\164\145\x72\x5f\x70\x6c\165\163\56\x70\150\160")) {
            goto ZAsy_;
        }
        goto qOa36;
        UbHsG:
        if ($x8R9S) {
            goto scBpJ;
        }
        goto sXCO2;
        t4NpP:
        $this->db->query("\104\x45\114\x45\124\105\40\106\x52\x4f\x4d\x20\x60" . DB_PREFIX . "\163\145\164\164\151\x6e\x67\x60\x20\x57\x48\x45\x52\105\x20\140\153\x65\x79\x60\40\x3d\x20\x27\x6d\x66\x69\x6c\x74\145\x72\x5f\x6c\x69\x63\145\x6e\163\x65\47");
        goto kET2j;
        iVd8C:
        HfU6O:
        goto VTyha;
        Hmqdy:
        if (!isset($_POST["\x6d\x66\151\x6c\164\x65\162\x41\152\x61\x78\114\106\x73"])) {
            goto e0NYO;
        }
        goto ioTq6;
        FhdDL:
        $vplj1 = file_get_contents(DIR_SYSTEM . "\x6c\151\x62\x72\x61\x72\x79\x2f\x6d\146\151\154\164\x65\x72\137\x63\x6f\x72\x65\56\160\x68\x70");
        goto s0AGG;
        eIgJQ:
        if (!($_POST["\155\x66\151\x6c\x74\x65\162\x41\x6a\141\170\x4c\106\x61"] == $vplj1)) {
            goto eeM70;
        }
        goto t4NpP;
        GYSp9:
        foreach ($c9GgV as $NOvJ1 => $xESdh) {
            goto g2v2H;
            HUEB2:
            $MS0VU[] = "\143\163\75" . urlencode(MegaFilterActivate::cs());
            goto AWX8m;
            i5wst:
            $Spqua = $this->db->query("\123\105\114\105\x43\124\x20\x2a\x20\106\122\117\x4d\x20\140" . DB_PREFIX . "\163\145\x74\164\151\156\x67\140\40\x57\110\105\x52\105\40\x60\x6b\x65\x79\x60\40\111\116\x28\x27\x63\x6f\x6e\x66\x69\x67\x5f\x74\x68\x65\x6d\x65\x27\x2c\x27\x63\x6f\x6e\x66\151\147\x5f\164\x65\155\160\x6c\x61\164\145\47\x29\x20\x41\x4e\104\x20\x60\x63\x6f\x64\x65\x60\x3d\47\x63\157\156\x66\x69\147\x27\40\101\x4e\104\40\140\x73\x74\157\x72\145\137\x69\x64\x60\75" . (int) $NOvJ1)->row;
            goto MzyHZ;
            g2v2H:
            $GW89M = parse_url($xESdh);
            goto mvJxn;
            l2wL_:
            gnzCI:
            goto ab4Lz;
            cVelE:
            $MS0VU[] = "\x70\75" . urlencode(isset($GW89M["\160\x61\x74\150"]) ? $GW89M["\x70\x61\x74\150"] : "\x2f");
            goto IQz38;
            ab4Lz:
            FhlLm:
            goto s9RQW;
            xsY9g:
            foreach ($nuxZn as $PUKvk => $GFygx) {
                goto Vv0eF;
                og3Hn:
                $x8R9S = true;
                goto KJKqm;
                tYsI0:
                if (!(false != ($NAfRl = $this->a3RhsknXtGQk3a($xESdh)))) {
                    goto fAp2e;
                }
                goto zOzNV;
                q0XAB:
                goto uJm89;
                goto Uaklc;
                dI90V:
                goto HbllG;
                goto L0m98;
                vcy1X:
                RDsVL:
                goto q0XAB;
                NvCPz:
                if (!($NAfRl["\163\x74\141\164\165\163"] != "\x73\165\x63\x63\x65\x73\163")) {
                    goto MbQeB;
                }
                goto og3Hn;
                KJKqm:
                goto HbllG;
                goto lWwBm;
                QOntr:
                fAp2e:
                goto liHEe;
                lWwBm:
                MbQeB:
                goto vcy1X;
                liHEe:
                qH1HN:
                goto kwCFH;
                Uaklc:
                cFDkh:
                goto no6b_;
                F40Xc:
                $NAfRl = unserialize($NAfRl);
                goto NvCPz;
                L0m98:
                uJm89:
                goto QOntr;
                Vv0eF:
                $xESdh = "\x68\x74\x74\160\72\x2f\57\x61\143\164\151\x76\x61\164\x65\56\x6f\143\144\145\x6d\157\x2e\x65\165\x2f\x3f\145\75" . urlencode($PUKvk) . "\46\x76\x3d" . urlencode($GFygx) . "\46" . implode("\x26", $MS0VU);
                goto tYsI0;
                zOzNV:
                if ($NAfRl == "\55\61") {
                    goto cFDkh;
                }
                goto neLaO;
                no6b_:
                $x8R9S = true;
                goto dI90V;
                neLaO:
                if (!($NAfRl != "\x31")) {
                    goto RDsVL;
                }
                goto F40Xc;
                kwCFH:
            }
            goto aNYF8;
            AWX8m:
            $MS0VU[] = "\x63\x6c\x3d\61";
            goto xsY9g;
            tCnZt:
            $MS0VU[] = "\164\75" . urlencode(isset($Spqua["\x76\x61\x6c\165\145"]) ? (string) $Spqua["\x76\x61\x6c\x75\145"] : '');
            goto HUEB2;
            MzyHZ:
            $MS0VU[] = "\x68\x3d" . urlencode($GW89M["\150\x6f\163\x74"]);
            goto cVelE;
            IQz38:
            $MS0VU[] = "\x6f\x3d" . urlencode(VERSION);
            goto tCnZt;
            mvJxn:
            $MS0VU = array("\x6f\162\144\x65\162\x5f\x69\x64\x3d" . urlencode($dNmF3["\x6f\x72\x64\145\x72\137\x69\x64"]), "\x6f\x72\144\145\162\137\x65\155\x61\x69\154\75" . urlencode($dNmF3["\x65\155\141\151\154"]));
            goto c98Us;
            aNYF8:
            HbllG:
            goto l2wL_;
            c98Us:
            if (empty($GW89M["\x68\157\x73\164"])) {
                goto gnzCI;
            }
            goto i5wst;
            s9RQW:
        }
        goto hD_ia;
        dr_K3:
        file_put_contents(DIR_SYSTEM . "\x6c\151\142\162\141\x72\x79\x2f\155\146\151\x6c\x74\x65\x72\137\155\157\144\x75\154\x65\x2e\x70\x68\160", "\74\x3f\160\x68\x70\40\42\42\x3b");
        goto p0umM;
        NZviA:
        vrTt1:
        goto ny0Dw;
        ulJtw:
        $Kp2WX = md5($Kp2WX);
        goto AU3iO;
        WPp0F:
        ZAsy_:
        goto TKpB1;
        HauuW:
        if (!isset($_POST["\x6d\146\x69\x6c\164\145\x72\101\x6a\141\x78\114\x46\141"])) {
            goto ge4_0;
        }
        goto FhdDL;
        DMr2d:
        if (!(null != ($dNmF3 = $this->config->get("\155\x66\x69\154\x74\x65\x72\x5f\x6c\151\x63\145\x6e\163\145")) && $_POST["\x6d\x66\151\154\x74\145\x72\101\152\x61\170\114\106\x61"] == substr($dNmF3["\x6f\x72\144\145\x72\137\x69\x64"], 0, 5) . substr($dNmF3["\145\x6d\141\x69\154"], 0, 5))) {
            goto FDavS;
        }
        goto l0iJP;
        jBrd1:
        if (!(null != ($dNmF3 = $this->config->get("\x6d\x66\151\x6c\x74\x65\x72\x5f\x6c\151\143\x65\x6e\x73\145")))) {
            goto BdDv1;
        }
        goto KBsdA;
        JlyQZ:
        scBpJ:
        goto BO2CI;
        lWEjd:
        require_once DIR_SYSTEM . "\154\151\142\162\141\162\x79\57\x6d\x66\x69\x6c\x74\x65\162\x5f\x61\143\x74\151\x76\141\164\x65\56\160\x68\160";
        goto JDoDx;
        OWlKi:
        $Kp2WX = file_get_contents(DIR_SYSTEM . "\x6c\x69\x62\x72\x61\x72\171\57\155\146\151\x6c\164\145\x72\x5f\155\157\x64\x75\x6c\145\56\x70\x68\160");
        goto ulJtw;
        F0Xhu:
        file_put_contents(DIR_SYSTEM . "\x6c\x69\x62\x72\141\x72\x79\x2f\x6d\146\x69\x6c\164\145\162\x5f\x63\157\162\x65\x2e\160\x68\x70", "\x3c\x3f\160\x68\160\40\42\x22\x3b");
        goto dr_K3;
        o0Qt1:
        $this->a4tdqSKCEjyr4a = $Os19d;
        goto jKfw0;
        dLIA9:
        ge4_0:
        goto Hmqdy;
        sCwtL:
        file_put_contents(DIR_SYSTEM . "\x6c\x69\142\162\141\162\x79\57\155\x66\x69\154\x74\x65\162\x5f\155\157\144\165\x6c\145\x2e\x70\x68\x70", "\74\x3f\x70\x68\x70\x20\x22\42\73");
        goto Hpjdl;
        ny0Dw:
        $this->a5CXdpESIGYj5a["\154\x6c\x6c"] = "\155\146";
        goto Bhfv1;
        EVO6k:
        WMdUk:
        goto Wwd9A;
        BhZ8a:
        foreach ($this->db->query("\123\x45\114\x45\x43\x54\x20\x2a\40\x46\x52\117\x4d\x20\140" . DB_PREFIX . "\x73\164\157\x72\x65\140")->rows as $hhylr) {
            $c9GgV[$hhylr["\163\164\157\x72\x65\137\x69\144"]] = $hhylr["\x75\162\154"];
            tX_Ef:
        }
        goto iVd8C;
        X6qeL:
        require_once DIR_SYSTEM . "\154\x69\x62\162\x61\162\171\57\155\146\x69\154\x74\145\162\137\141\x63\x74\151\x76\141\164\145\56\160\x68\x70";
        goto asHAE;
        pV9jI:
        file_put_contents(DIR_SYSTEM . "\154\x69\142\x72\x61\162\x79\57\155\x66\151\x6c\x74\x65\x72\137\155\x6f\x64\x75\154\x65\56\160\x68\160", '');
        goto NSgv8;
        jKfw0:
        if (!isset($_POST["\x6d\146\x69\x6c\x74\145\x72\101\x6a\x61\170\x4c\x4c"])) {
            goto T27Gw;
        }
        goto X6qeL;
        QuyZ2:
        $this->db->query("\xa\x9\x9\11\x9\11\x9\x55\x50\x44\x41\x54\x45\40\12\11\11\x9\11\x9\11\x9\140" . DB_PREFIX . "\163\x65\164\164\x69\156\x67\140\40\12\x9\11\x9\x9\11\x9\123\x45\124\x20\12\11\x9\11\11\x9\x9\11\140\x76\141\154\165\145\x60\x20\75\x20\x27" . $this->db->escape(version_compare(VERSION, "\x32\56\61\56\60\x2e\60", "\x3e\x3d") ? json_encode($dNmF3) : serialize($dNmF3)) . "\47\40\12\11\11\11\x9\11\x9\x57\x48\x45\122\105\x20\12\x9\11\x9\x9\x9\11\x9\140\153\145\171\x60\x20\75\x20\x27\x6d\146\x69\x6c\x74\145\x72\x5f\x6c\151\143\x65\156\163\145\47");
        goto g4QeL;
        l5spN:
        file_put_contents(DIR_SYSTEM . "\x6c\151\142\x72\x61\162\171\57\x6d\x66\x69\x6c\x74\x65\162\137\143\157\162\145\56\160\x68\x70", '');
        goto pV9jI;
        TKpB1:
        $x8R9S = false;
        goto GYSp9;
        l0iJP:
        $this->db->query("\x44\x45\114\105\124\105\40\x46\122\x4f\x4d\x20\x60" . DB_PREFIX . "\163\x65\x74\x74\151\156\147\140\40\127\110\x45\122\105\40\140\x6b\x65\x79\x60\x20\75\x20\x27\x6d\x66\151\154\x74\x65\162\x5f\154\x69\143\145\x6e\x73\145\x27");
        goto F0Xhu;
        kET2j:
        file_put_contents(DIR_SYSTEM . "\x6c\151\x62\162\141\162\x79\x2f\155\x66\151\154\x74\145\x72\137\x63\157\x72\145\x2e\x70\150\160", "\x3c\x3f\x70\150\x70\40\42\x22\73");
        goto sCwtL;
        AU3iO:
        if (!in_array($_POST["\155\146\x69\154\164\145\x72\101\x6a\141\170\x4c\114"], array($dQzmN, $Kp2WX))) {
            goto WMdUk;
        }
        goto AcStI;
        qOa36:
        $nuxZn["\155\x65\147\141\137\x66\x69\154\x74\x65\162\x5f\x70\154\165\163"] = $this->config->get("\155\146\x69\x6c\x74\x65\162\x5f\x70\x6c\165\x73\137\x76\145\x72\x73\x69\157\x6e");
        goto WPp0F;
        ioTq6:
        die("\x31");
        goto pkGJN;
        AcStI:
        file_put_contents(DIR_SYSTEM . "\x6c\151\x62\162\141\162\171\57\x6d\146\x69\154\164\x65\162\137\x63\x6f\x72\145\56\x70\150\160", "\x3c\77\x70\150\160\x20\42\x22\73");
        goto QWHMf;
        g4QeL:
        goto ETl3w;
        goto JlyQZ;
        Bhfv1:
        BdDv1:
        goto l5ix9;
        KBsdA:
//       if (!(time() > $dNmF3["\164\x69\155\145"] + "\66\x30\x34\x38\60\x30" || time() - $dNmF3["\x74\151\155\x65"] < "\60" || !empty($_POST["\x6d\146\151\154\x74\x65\162\x41\x6a\141\x78\x4c\x46"]))) {
            goto vrTt1;
//       }
        goto lWEjd;
        Hpjdl:
        eeM70:
        goto DMr2d;
        p0umM:
        FDavS:
        goto dLIA9;
        QWHMf:
        file_put_contents(DIR_SYSTEM . "\154\x69\142\162\141\162\171\x2f\x6d\x66\151\x6c\164\x65\162\137\x6d\x6f\144\x75\x6c\x65\56\x70\x68\x70", "\74\77\x70\150\160\x20\42\42\x3b");
        goto EVO6k;
        l5ix9:
    }
    public function __get($lUMIb)
    {
        return $this->a4tdqSKCEjyr4a->{$lUMIb};
    }
    public function render($eh5vP)
    {
        goto f09hj;
        xIH54:
        if (!($eh5vP["\160\x6f\x73\x69\164\x69\x6f\x6e"] == "\x63\157\x6e\x74\x65\156\x74\137\x74\x6f\160" && !empty($Y1Wds["\x63\x68\141\156\147\x65\137\164\x6f\x70\137\164\157\x5f\143\x6f\x6c\x75\155\156\137\157\x6e\x5f\x6d\x6f\142\x69\154\x65"]) && $CT_E1)) {
            goto OvM0W;
        }
        goto t7A_P;
        EyaDe:
        pdZol:
        goto kOaq_;
        t7A_P:
        $eh5vP["\x70\157\x73\x69\164\x69\x6f\x6e"] = "\143\x6f\x6c\165\155\156\137\x6c\145\x66\164";
        goto jCNaH;
        O9R_F:
        $qXLQE = array("\143\x61\x74\141\x6c\x6f\x67\x2f\166\x69\x65\167\57\x74\150\145\155\145\57\x64\145\146\141\165\x6c\164\x2f\163\164\171\x6c\x65\x73\x68\145\145\164\57\x6d\146\x2f\x6a\161\x75\145\162\171\x2d\165\151\56\x6d\151\156\56\143\x73\163\x3f\x76" . $W6cO4["\x5f\x76"], file_exists(DIR_TEMPLATE . $this->config->get("\143\157\x6e\x66\x69\147\137\x74\x65\155\160\154\x61\164\x65") . "\57\163\164\x79\x6c\x65\x73\150\x65\145\x74\x2f\155\146\57\x73\164\171\x6c\x65\x2e\143\163\163") ? "\143\x61\164\141\154\x6f\x67\57\166\x69\x65\167\57\164\x68\x65\155\145\x2f" . $this->config->get("\143\x6f\x6e\x66\151\147\137\x74\145\155\160\154\141\x74\145") . "\x2f\x73\x74\171\154\145\x73\150\x65\145\x74\57\155\x66\57\163\x74\x79\154\x65\x2e\x63\x73\163\77\166" . $W6cO4["\x5f\x76"] : "\x63\x61\164\141\x6c\x6f\147\x2f\166\x69\145\x77\57\x74\150\145\155\x65\57\144\145\x66\x61\x75\x6c\164\57\x73\164\171\154\145\163\x68\x65\145\x74\57\155\x66\x2f\163\x74\x79\154\x65\x2e\x63\163\163\77\166" . $W6cO4["\137\x76"], "\143\141\164\x61\154\x6f\147\57\166\151\145\x77\57\164\x68\145\155\145\57\x64\x65\x66\141\165\x6c\164\57\x73\x74\x79\154\145\163\150\145\x65\x74\57\155\146\x2f\163\164\x79\x6c\x65\55\62\56\x63\163\163\x3f\x76" . $W6cO4["\x5f\166"]);
        goto jDw6M;
        VEPUg:
        $W6cO4["\x72\145\x71\165\x65\x73\x74\x47\145\164"]["\x6d\146\160\137\x6f\162\x67\x5f\x70\x61\x74\x68\x5f\141\x6c\151\x61\163\x65\x73"] = implode("\x5f", MegaFilterCore::pathToAliases($this, $W6cO4["\x72\145\x71\x75\145\163\164\107\x65\164"]["\x6d\x66\x70\137\157\162\x67\x5f\x70\x61\164\150"]));
        goto fNpUH;
        Rw0Ey:
        if (class_exists("\x56\121\115\x6f\x64")) {
            goto Wj9lI;
        }
        goto b2SJ0;
        pRhEt:
        dS8MH:
        goto F9AAt;
        wwLbw:
        K4Qk5:
        goto djpTc;
        bg2No:
        return;
        goto snu0Z;
        jDw6M:
        if ($nwQXX) {
            goto yxXli;
        }
        goto q4gZT;
        yt5E7:
        if (!($W6cO4["\x70\162\151\143\145"]["\155\x69\156"] == 0 && $W6cO4["\160\162\151\143\x65"]["\x6d\x61\x78"] == 0 && !empty($W6cO4["\160\162\x69\x63\x65"]["\x65\155\160\164\x79"]))) {
            goto EQv1E;
        }
        goto C2BNF;
        JNWP4:
        $kDP9W = null;
        goto SuO5s;
        ou6F1:
        Orww1:
        goto eqcUu;
        K7sf3:
        if (isset($eh5vP["\137\x69\x64\x78"])) {
            goto fVAE5;
        }
        goto p09rJ;
        KDm9X:
        PERjl:
        goto H7Sia;
        hWeim:
        if (!empty($k0FPF["\150\151\144\x65\137\143\141\x74\x65\147\x6f\x72\x79\x5f\x69\x64\x5f\x77\x69\x74\150\x5f\x63\150\x69\154\144\x73"])) {
            goto uwvq8;
        }
        goto blnTN;
        Qwl2W:
        $W6cO4["\x64\151\162\145\143\x74\x69\x6f\156"] = $this->language->get("\144\x69\162\x65\143\164\x69\157\156");
        goto CtGKX;
        qD0Fu:
        pv76w:
        goto GQv0b;
        L50BB:
        pnRvC:
        goto IuWR4;
        R9N_0:
        $SusDi = $this->customer->isLogged() ? $this->customer->getGroupId() : $this->config->get("\143\x6f\x6e\146\151\147\x5f\143\165\163\x74\x6f\155\145\x72\x5f\x67\162\x6f\165\x70\137\151\x64");
        goto RTD4N;
        blnTN:
        $lfJN5 = array_pop($mirrY);
        goto JVPsk;
        FBuzm:
        $this->a1OkdYsKmEat1a("\x4d\x65\x67\141\40\106\151\x6c\x74\145\x72\x20\120\122\x4f\40\x74\x6f\x20\x77\x6f\x72\153\x20\x70\x72\157\160\x65\162\154\171\40\162\x65\x71\x75\x69\162\145\x73\x20\x56\121\115\x6f\144\40\x69\x6e\40\x76\x65\x72\163\x69\x6f\156\40\62\56\65\56\61\40\157\162\x20\x6c\x61\x74\x65\162\56\x3c\x62\162\x20\57\x3e\x59\157\165\x72\40\x76\x65\162\163\x69\157\156\40\157\x66\40\126\121\115\157\x64\40\x69\x73\x20\164\x6f\157\40\x6f\154\x64\x2e\40\120\x6c\145\x61\163\x65\x20\x75\x70\x67\x72\x61\144\x65\x20\x69\x74\40\164\157\40\x74\150\x65\x20\x6c\141\164\145\x73\x74\40\166\x65\162\163\151\157\156\x2e", true);
        goto q7BZi;
        m4ts2:
        e808r:
        goto za1SD;
        s1iJj:
        if ($EEo8Z) {
            goto N2X93;
        }
        goto RaLnx;
        dF3n4:
        $W6cO4["\x70\162\x69\143\x65"] = array("\x6d\151\x6e" => 0, "\x6d\x61\170" => 0, "\x65\x6d\x70\x74\171" => true);
        goto dit18;
        GGCZP:
        FjvQN:
        goto Rw0Ey;
        nUqIq:
        if (!isset($W6cO4["\x72\145\161\x75\145\x73\164\107\145\164"]["\x70\141\164\150"])) {
            goto xoLnn;
        }
        goto C5Hhz;
        pStSg:
        $eh5vP["\x6f\160\164\151\157\156\163"] = empty($k0FPF["\157\160\164\151\x6f\156\x73"]) ? array() : $k0FPF["\x6f\x70\x74\x69\x6f\x6e\163"];
        goto y7hpP;
        RaLnx:
        return;
        goto JeMzm;
        SuO5s:
        if (empty($Y1Wds["\143\141\143\150\145\137\x65\x6e\x61\142\154\145\x64"])) {
            goto KtIp7;
        }
        goto LOXN9;
        IsVfu:
        RsP2w:
        goto f9XEI;
        U_AYd:
        $W6cO4["\137\162\x6f\165\164\x65\x48\x6f\155\x65"] = base64_encode("\143\x6f\155\155\x6f\156\x2f\x68\x6f\x6d\145");
        goto LkGjh;
        Cj8Xx:
        $W6cO4["\x5f\x64\x61\x74\x61"] = $OH713->getData();
        goto JZNJQ;
        hujzr:
        if (file_exists(DIR_SYSTEM . "\x2e\56\x2f\143\x61\x74\141\154\157\x67\57\166\151\145\x77\x2f\164\150\145\x6d\x65\x2f\144\145\x66\141\x75\154\164\57\163\164\171\x6c\x65\x73\x68\x65\x65\164\x2f\x6d\x66\x2f\x63\x6f\155\x62\x69\156\x65\144\x2e\x63\x73\x73")) {
            goto s3SSM;
        }
        goto C0VHb;
        Okm6D:
        $W6cO4["\x5f\150\157\162\151\x7a\157\156\164\141\x6c\111\x6e\x6c\151\156\145"] = $eh5vP["\160\157\x73\x69\164\x69\x6f\156"] == "\x63\157\156\164\x65\156\164\137\164\157\160" && !empty($k0FPF["\x69\x6e\x6c\151\x6e\145\x5f\150\x6f\x72\x69\x7a\x6f\x6e\x74\x61\154"]) ? true : false;
        goto qIRNz;
        uOLAt:
        EFnzJ:
        goto YRgsy;
        iD8Hy:
        $this->model_module_mega_filter->setSettings($Y1Wds);
        goto tVfeB;
        geBFg:
        OMfVr:
        goto Ahv49;
        SuAGr:
        if (empty($Y1Wds["\143\141\x63\x68\145\x5f\145\x6e\x61\x62\154\x65\x64"])) {
            goto KSuR8;
        }
        goto kPCFf;
        AE7__:
        $W6cO4["\x64\x69\x73\x70\x6c\x61\171\123\x65\x6c\x65\x63\x74\145\x64\106\151\154\164\145\x72\x73"] = empty($k0FPF["\x64\151\x73\x70\154\x61\x79\x5f\x73\145\x6c\145\x63\x74\145\144\137\x66\x69\x6c\x74\x65\x72\163"]) ? false : $k0FPF["\144\x69\163\x70\154\141\171\x5f\163\145\x6c\145\143\164\145\144\x5f\146\151\x6c\164\x65\162\x73"];
        goto QtNQD;
        C1qxx:
        goto eGlfK;
        goto f5ejP;
        iecvH:
        if ($O5r8a) {
            goto Ezb07;
        }
        goto bg2No;
        oI6Qv:
        $W6cO4["\x73\145\157"] = $this->config->get("\155\145\x67\x61\x5f\146\x69\x6c\x74\x65\162\x5f\163\145\157");
        goto esjJa;
        AKT5A:
        return;
        goto m2S84;
        WsdMR:
        return;
        goto dE5md;
        u63MQ:
        Zn1mQ:
        goto L3hbS;
        OVm7f:
        $W6cO4["\162\145\x71\x75\145\x73\164\x47\145\164"]["\x6d\x66\x70\137\160\x61\164\150\x5f\x61\x6c\x69\141\163\145\x73"] = implode("\x5f", MegaFilterCore::pathToAliases($this, $W6cO4["\x72\x65\161\x75\145\x73\164\107\145\x74"]["\x6d\x66\160\137\x70\141\x74\150"]));
        goto eCkcE;
        O27gu:
        B3du_:
        goto wfEyr;
        xd82Q:
        $eh5vP["\x61\x74\164\162\151\x62\163"] = empty($k0FPF["\x61\164\x74\x72\x69\142\163"]) ? array() : $k0FPF["\x61\164\164\162\x69\x62\163"];
        goto qD0Fu;
        tNTZD:
        $W6cO4["\137\160\x6f\163\151\x74\x69\157\x6e"] = $eh5vP["\x70\157\x73\x69\164\x69\x6f\156"];
        goto UUSAL;
        wmDdf:
        sbZmo:
        goto cEgV1;
        HzcaL:
        $nwQXX = class_exists("\115\151\152\x6f\123\150\157\x70") ? true : false;
        goto f_Bzq;
        Bz1gU:
        return false;
        goto s1eze;
        YQUB1:
        $this->load->model("\x6d\157\144\165\x6c\x65\57\x6d\x65\x67\141\137\x66\151\x6c\x74\145\x72");
        goto iD8Hy;
        nyt5I:
        foreach ($nL3wR as $Kvp0C => $dxVqA) {
            goto PRjXc;
            gxgDL:
            if (!isset($this->request->get[$Kvp0C . "\x5f\x74\145\x6d\160"])) {
                goto qAUIc;
            }
            goto lOknA;
            lOknA:
            unset($this->request->get[$Kvp0C . "\137\x74\145\155\160"]);
            goto mmYCI;
            eobE6:
            u6eaO:
            goto JDi2R;
            xBwYF:
            $this->request->get[$Kvp0C] = $dxVqA;
            goto Iniex;
            mmYCI:
            qAUIc:
            goto eobE6;
            PRjXc:
            if (!($dxVqA !== null)) {
                goto Y5OWj;
            }
            goto xBwYF;
            Iniex:
            Y5OWj:
            goto gxgDL;
            JDi2R:
        }
        goto lt_jh;
        Pzn4Q:
        $OH713->parseParams();
        goto HzcaL;
        cEgV1:
        UEvWp:
        goto m2OCW;
        kXnF3:
        if (empty($k0FPF["\x63\x61\164\145\147\x6f\162\171\137\x69\144"])) {
            goto OMfVr;
        }
        goto buqK3;
        AuHde:
        if (file_exists($bExMT)) {
            goto UIMcD;
        }
        goto NJGRp;
        Hr9QU:
        $W6cO4["\x5f\166"] = $this->config->get("\x6d\x66\151\154\x74\145\x72\137\166\145\x72\163\151\x6f\x6e") ? $this->config->get("\155\x66\151\154\164\x65\162\137\166\145\162\x73\x69\x6f\156") : "\x31";
        goto rie0k;
        F9AAt:
        if (in_array($this->config->get("\x63\157\156\146\x69\x67\137\163\x74\157\x72\145\x5f\151\x64"), $k0FPF["\163\x74\157\x72\x65\x5f\x69\144"])) {
            goto k17RV;
        }
        goto AKT5A;
        C2BNF:
        $sMa62 = array();
        goto sAcdb;
        GQv0b:
        if (!empty($eh5vP["\157\160\164\x69\157\x6e\x73"])) {
            goto bDfjQ;
        }
        goto pStSg;
        gwatG:
        $W6cO4["\147\x65\x74\123\x79\155\142\x6f\x6c\122\x69\x67\x68\x74"] = $this->currency->getSymbolRight(isset($this->session->data["\143\165\162\x72\145\156\x63\x79"]) ? $this->session->data["\x63\x75\162\162\145\x6e\x63\171"] : '');
        goto Tf6r6;
        djpTc:
        MijoShop::get()->addHeader(JPATH_MIJOSHOP_OC . "\57\143\141\x74\141\154\157\147\x2f\166\x69\x65\x77\x2f\x74\150\x65\x6d\145\x2f\x64\145\x66\141\165\x6c\164\x2f\x73\164\171\x6c\145\163\150\145\x65\164\57\x6d\146\x2f\x73\164\171\x6c\x65\x2d\62\56\143\163\x73");
        goto yMQcX;
        Q_fyY:
        $AVBJW = $this->a0KNdObCCIUz0a($EEo8Z);
        goto y5RpN;
        Mj0cq:
        UIMcD:
        goto IwUVE;
        fLOsq:
        $W6cO4["\141\x6a\x61\x78\107\x65\x74\x43\141\x74\145\x67\157\162\171\125\162\154"] = $this->a2aGukWUZiqu2a($this->url->link("\x6d\x6f\x64\x75\154\145\57\155\x65\147\141\137\146\x69\154\x74\x65\162\57\147\145\x74\x63\x61\164\145\x67\157\162\151\x65\163", '', "\123\123\114"));
        goto ydKtV;
        rie0k:
        $W6cO4["\x64\x69\x73\160\x6c\x61\x79\x41\154\x77\x61\171\163\101\x73\x57\151\x64\x67\x65\x74"] = empty($k0FPF["\144\x69\x73\x70\x6c\141\171\137\141\154\x77\141\x79\x73\x5f\x61\x73\137\x77\x69\144\147\x65\164"]) ? false : true;
        goto AE7__;
        Nj4fR:
        if (empty($k0FPF["\143\x75\163\164\157\155\145\162\137\x67\162\x6f\x75\160\163"])) {
            goto UEvWp;
        }
        goto R9N_0;
        guk6L:
        if (!empty($eh5vP["\141\164\164\162\x69\x62\163"])) {
            goto pv76w;
        }
        goto xd82Q;
        ebaJs:
        if (!(in_array($Y1Wds["\x6c\141\171\157\165\164\x5f\143"], $k0FPF["\x6c\x61\x79\x6f\x75\164\x5f\151\x64"]) && isset($this->request->get["\160\141\x74\150"]))) {
            goto Orww1;
        }
        goto kXnF3;
        f9XEI:
        goto jjcXg;
        goto Kfm3p;
        VAz90:
        if (file_exists(DIR_SYSTEM . "\56\x2e\57\143\x61\x74\141\x6c\157\x67\x2f\x76\151\x65\x77\57\x6a\x61\166\x61\163\x63\162\x69\x70\x74\57\x6d\x66\57\x63\x6f\155\142\151\156\x65\144\56\x6a\x73")) {
            goto RRzF5;
        }
        goto ij3AU;
        aZgJ6:
        return;
        goto pRhEt;
        dwPDO:
        goto PERjl;
        goto EyaDe;
        qofcd:
        vBZHi:
        goto mnyZN;
        qr0qf:
        $W6cO4["\137\x72\x6f\x75\x74\145\x43\x61\x74\x65\x67\x6f\162\x79"] = base64_encode("\160\x72\157\x64\165\x63\164\57\x63\141\164\x65\147\x6f\x72\171");
        goto U_AYd;
        Udpr_:
        zZnBZ:
        goto UgDGa;
        q7BZi:
        return;
        goto qofcd;
        HKfKo:
        OvM0W:
        goto Qwl2W;
        oap4G:
        NUaTI:
        goto PhL6E;
        GjP99:
        if (!(isset($k0FPF["\x6c\x61\x79\x6f\165\164\x5f\x69\x64"]) && is_array($k0FPF["\154\141\x79\157\x75\x74\x5f\151\144"]))) {
            goto SCN8i;
        }
        goto ebaJs;
        Q_L3_:
        if (NULL != ($k0FPF = $this->db->query("\x53\105\114\105\x43\124\x20\x2a\40\106\122\117\x4d\x20\140" . DB_PREFIX . "\x6d\146\151\x6c\164\x65\162\137\163\145\164\164\151\156\147\163\140\x20\x57\110\x45\x52\x45\40\x60\x69\144\170\x60\40\75\x20" . (int) $eh5vP["\137\x69\x64\170"])->row)) {
            goto EoyYK;
        }
        goto QX9Yv;
        za1SD:
        $Y1Wds = $this->config->get("\x6d\x65\x67\141\x5f\146\151\x6c\x74\x65\x72\137\x73\145\x74\164\151\x6e\x67\x73");
        goto I_S8L;
        EvQmj:
        gxCPq:
        goto JxXm7;
        eV50p:
        LCX0x:
        goto ISIK9;
        cMb9x:
        $CT_E1 = Mobile_Detect_MFP::create()->isMobile();
        goto jFYDt;
        b2SJ0:
        require_once modification(DIR_SYSTEM . "\154\x69\142\162\141\x72\171\x2f\x6d\146\x69\x6c\164\145\162\137\x6d\157\142\x69\x6c\x65\56\160\150\160");
        goto C1qxx;
        QgNkj:
        s3SSM:
        goto PXFAK;
        zY26I:
        $W6cO4["\150\x69\x64\x65\137\x63\157\x6e\x74\x61\x69\156\145\x72"] = true;
        goto bQdSg;
        UvuHV:
        if (!empty($k0FPF["\x63\141\164\145\147\157\x72\x79\137\151\144\x5f\x77\x69\x74\x68\137\x63\x68\151\x6c\x64\x73"])) {
            goto zlAUC;
        }
        goto UTVEY;
        T72O7:
        foreach ($mirrY as $lfJN5) {
            goto jdU8M;
            bJPxK:
            $O5r8a = true;
            goto vMoVS;
            R9CvG:
            Lh0lb:
            goto TRZpz;
            ZYC79:
            NfDXp:
            goto R9CvG;
            jdU8M:
            if (!in_array($lfJN5, $k0FPF["\x63\141\164\145\147\x6f\162\x79\x5f\x69\x64"])) {
                goto NfDXp;
            }
            goto bJPxK;
            vMoVS:
            goto AWxUj;
            goto ZYC79;
            TRZpz:
        }
        goto DZTuW;
        E2HxK:
        pQx17:
        goto s1iJj;
        pLFmv:
        return;
        goto GGCZP;
        guMGy:
        gg2AI:
        goto Q_fyY;
        mDqkP:
        OsHT3:
        goto SAnU1;
        gwBo1:
        if (!empty($eh5vP["\x62\x61\x73\145\x5f\141\164\164\x72\x69\142\x73"])) {
            goto qCTe_;
        }
        goto oWHyU;
        CSygf:
        if (in_array($lfJN5, $k0FPF["\143\x61\164\145\147\157\162\171\137\151\144"])) {
            goto wQIkL;
        }
        goto Bz1gU;
        PhL6E:
        if (!version_compare(VQMod::$_vqversion, "\62\x2e\65\56\61", "\74")) {
            goto vBZHi;
        }
        goto FBuzm;
        wwqSO:
        $W6cO4["\160\162\151\143\x65"] = $OH713->getMinMaxPrice();
        goto yt5E7;
        SAnU1:
        foreach ($Q0Yoj as $Zijfy) {
            goto Gn3IH;
            dz1m7:
            w885w:
            goto QIOjW;
            adFdQ:
            $Zijfy = str_replace("\56\152\x73\77\x76" . $W6cO4["\137\x76"], "\56\x6a\163", $Zijfy);
            goto UQ4jq;
            Gn3IH:
            if (empty($Y1Wds["\155\151\156\x69\146\x79\137\x73\x75\160\160\157\x72\x74"])) {
                goto JYCOv;
            }
            goto adFdQ;
            JckAZ:
            $this->document->addScript("\143\x61\x74\141\x6c\x6f\x67\57\166\151\x65\x77\x2f\152\x61\x76\141\x73\x63\x72\x69\x70\164\x2f\x6d\146\57" . $Zijfy);
            goto dz1m7;
            UQ4jq:
            JYCOv:
            goto JckAZ;
            QIOjW:
        }
        goto O27gu;
        m1uw7:
        L5U8U:
        goto b_yIW;
        m3Vw0:
        $W6cO4["\x68\145\141\144\x69\x6e\147\137\x74\151\x74\154\145"] = $k0FPF["\164\151\164\x6c\x65"][$this->config->get("\x63\157\156\x66\x69\x67\137\x6c\x61\x6e\147\165\x61\147\145\137\x69\144")];
        goto fHeOV;
        y7hpP:
        bDfjQ:
        goto hdJ7K;
        Xlc0_:
        $eh5vP["\x66\151\x6c\x74\x65\162\163"] = empty($k0FPF["\146\151\154\x74\x65\162\163"]) ? array() : $k0FPF["\x66\x69\x6c\164\x65\162\163"];
        goto Udpr_;
        zZsQl:
        syXQr:
        goto JgaFP;
        ZKV6w:
        return;
        goto zZsQl;
        nlmaF:
        goto bNHoP;
        goto e7lH9;
        zJHlb:
        $W6cO4["\141\x6a\141\x78\x52\x65\163\x75\x6c\x74\163\125\162\154"] = $this->a2aGukWUZiqu2a($this->url->link("\155\x6f\144\165\x6c\145\57\x6d\145\147\x61\137\x66\151\154\x74\145\162\57\162\145\x73\165\x6c\x74\163", '', "\123\x53\x4c"));
        goto fLOsq;
        kOaq_:
        file_put_contents($bExMT, "\x76\x61\162\40\x4d\106\120\x5f\x52\124\x4c\x20\x3d\x20" . ($this->language->get("\144\151\x72\145\143\164\x69\157\156") == "\162\164\x6c" ? "\164\162\165\x65" : "\146\141\154\x73\x65") . "\73");
        goto Rzdke;
        QuzNM:
        $xZ8nY = false;
        goto r8Sar;
        J82rK:
        dK0jp:
        goto wwqSO;
        QtNQD:
        $W6cO4["\167\151\144\x67\x65\164\127\x69\164\x68\123\x77\x69\x70\x65"] = !isset($k0FPF["\167\151\x64\x67\145\x74\137\x77\151\164\x68\137\163\x77\151\160\145"]) || !empty($k0FPF["\167\151\x64\147\145\164\x5f\167\151\164\150\137\x73\x77\x69\160\x65"]) ? true : false;
        goto Ee210;
        CqHjR:
        $W6cO4["\x73\x65\x74\x74\151\x6e\x67\163"] = $Y1Wds;
        goto riS1t;
        qzY33:
        $Q0Yoj = array("\152\161\165\x65\x72\x79\55\165\151\x2e\x6d\x69\x6e\56\152\x73\x3f\x76" . $W6cO4["\x5f\166"], "\152\161\x75\145\x72\171\55\x70\154\165\x67\x69\x6e\x73\56\x6a\163\x3f\166" . $W6cO4["\x5f\166"], "\x68\141\155\155\145\162\56\x6a\163\x3f\x76" . $W6cO4["\x5f\166"], "\x69\163\x63\x72\157\x6c\154\56\x6a\x73\x3f\166" . $W6cO4["\x5f\166"], "\x6c\151\x76\145\146\x69\x6c\x74\145\162\x2e\152\163\77\166" . $W6cO4["\x5f\x76"], "\x73\x65\154\x65\143\x74\160\x69\143\153\145\x72\56\152\x73\77\x76" . $W6cO4["\x5f\x76"], "\x6d\x65\x67\x61\x5f\x66\x69\x6c\x74\x65\x72\56\152\x73\x3f\x76" . $W6cO4["\137\x76"]);
        goto O9R_F;
        Tf6r6:
        $W6cO4["\162\x65\161\x75\145\x73\x74\107\145\164"] = $this->request->get;
        goto Okm6D;
        o_7FO:
        MijoShop::getClass("\142\141\x73\x65")->addHeader($this->a2aGukWUZiqu2a($this->url->link("\155\157\144\165\154\x65\57\x6d\145\147\141\137\146\151\154\x74\x65\x72\x2f\x6a\x73\x5f\160\x61\162\141\155\x73", '', "\x53\123\x4c")), false);
        goto wMs8v;
        i3p19:
        $W6cO4["\x66\151\x6c\164\145\x72\163"] = $EEo8Z;
        goto CqHjR;
        SRrfN:
        foreach ($Q0Yoj as $Zijfy) {
            goto VONVr;
            VONVr:
            $Zijfy = str_replace("\x2e\152\x73\x3f\166" . $W6cO4["\137\x76"], "\56\x6a\x73", $Zijfy);
            goto LWo3U;
            yaYJg:
            $a0iyp .= file_get_contents(DIR_SYSTEM . "\56\x2e\57\143\141\x74\x61\154\x6f\x67\57\166\151\x65\x77\57\152\141\x76\141\163\143\x72\151\x70\164\57\x6d\x66\57" . $Zijfy);
            goto GkunN;
            LWo3U:
            $a0iyp .= $a0iyp ? "\xa\xa" : '';
            goto yaYJg;
            GkunN:
            i13ND:
            goto F1Wmm;
            F1Wmm:
        }
        goto L50BB;
        lt49n:
        require_once VQMod::modCheck(modification(DIR_SYSTEM . "\x6c\x69\x62\162\141\x72\171\x2f\x6d\x66\x69\154\x74\145\x72\137\155\x6f\x62\151\154\x65\x2e\x70\150\160"));
        goto LKvoB;
        cFO1T:
        fFlsw:
        goto Sfptc;
        Kfm3p:
        yxXli:
        goto o_7FO;
        H7Sia:
        goto JedtR;
        goto Mj0cq;
        uyIql:
        $eh5vP["\x63\x61\164\x65\x67\x6f\x72\x69\145\163"] = empty($k0FPF["\x63\141\164\145\x67\x6f\x72\151\x65\x73"]) ? array() : $k0FPF["\143\141\164\145\x67\x6f\162\151\145\163"];
        goto g8zrP;
        Ig8oC:
        o3kMb:
        goto ou6F1;
        R6590:
        $OH713 = MegaFilterCore::newInstance($this, NULL, array(), $Y1Wds);
        goto JNWP4;
        q4gZT:
        $bExMT = DIR_SYSTEM . "\x2e\x2e\x2f\x63\x61\164\141\x6c\157\x67\x2f\166\x69\145\x77\x2f\152\x61\166\x61\x73\143\162\x69\160\x74\57\155\146\x2f\144\x69\162\x65\143\x74\x69\x6f\x6e\x5f" . $this->config->get("\143\157\156\146\151\x67\137\x6c\141\156\x67\x75\x61\147\x65\137\151\144") . "\x2e\x6a\x73";
        goto AuHde;
        W4XJo:
        return;
        goto wmDdf;
        oHLUi:
        return;
        goto u63MQ;
        Pm8RN:
        if (!(isset($k0FPF["\x73\164\157\162\145\137\x69\x64"]) && is_array($k0FPF["\x73\164\x6f\162\x65\x5f\151\x64"]) && !in_array($this->config->get("\143\x6f\156\146\151\x67\137\163\164\x6f\162\145\x5f\x69\144"), $k0FPF["\x73\164\157\162\145\x5f\x69\144"]))) {
            goto obWL0;
        }
        goto TrjtX;
        om8Kv:
        if (!(!$kDP9W || NULL == ($EEo8Z = $OH713->_getCache($kDP9W)))) {
            goto gg2AI;
        }
        goto mTXnZ;
        yMQcX:
        jjcXg:
        goto p4Vqv;
        snu0Z:
        Ezb07:
        goto Tzt6Q;
        rQ3a6:
        if (!isset($W6cO4["\x72\145\161\x75\145\x73\164\x47\x65\164"]["\x6d\x66\160\x5f\x6f\x72\147\137\160\141\164\x68"])) {
            goto HdfJ0;
        }
        goto VEPUg;
        U3gps:
        if (empty($Y1Wds["\x63\157\x6d\x62\151\156\145\x5f\152\x73\x5f\143\x73\x73\137\146\151\x6c\x65\163"])) {
            goto OsHT3;
        }
        goto VAz90;
        pdgMO:
        xNQMb:
        goto EI05j;
        WdueD:
        if (file_exists(DIR_TEMPLATE . $this->config->get("\143\157\x6e\146\151\x67\137\164\145\155\x70\154\141\x74\145") . "\57\163\x74\171\154\x65\x73\x68\x65\x65\x74\57\x6d\146\x2f\x73\164\x79\x6c\145\x2e\x63\163\x73")) {
            goto fFlsw;
        }
        goto yQt_P;
        RhmEG:
        goto K4Qk5;
        goto cFO1T;
        Yct9j:
        uwvq8:
        goto M1HfB;
        JeMzm:
        N2X93:
        goto nyt5I;
        jK6Ns:
        if (!empty($k0FPF["\163\164\x61\164\x75\163"])) {
            goto L2d7K;
        }
        goto S2mzr;
        ymE9_:
        EoyYK:
        goto q581r;
        LOXN9:
        $kDP9W = "\151\x64\170\56" . $eh5vP["\x5f\151\x64\x78"] . "\x2e" . $OH713->cacheName();
        goto XFXFh;
        CkEa3:
        $O5r8a = false;
        goto T72O7;
        RTD4N:
        if (in_array($SusDi, $k0FPF["\143\165\x73\x74\x6f\155\x65\162\137\147\162\x6f\165\x70\x73"])) {
            goto sbZmo;
        }
        goto W4XJo;
        ydKtV:
        $W6cO4["\151\163\137\x6d\157\142\x69\154\145"] = $CT_E1;
        goto yaGJ4;
        LkGjh:
        $W6cO4["\137\x72\x6f\x75\164\145\x49\x6e\146\x6f\x72\x6d\141\164\x69\x6f\x6e"] = base64_encode("\151\156\146\x6f\162\x6d\141\164\x69\157\x6e\57\151\156\x66\x6f\x72\155\x61\x74\151\157\x6e");
        goto tNTZD;
        BnBgF:
        if (!isset($k0FPF["\164\151\164\154\x65"][$this->config->get("\x63\157\156\146\x69\x67\137\x6c\141\x6e\147\x75\141\x67\x65\137\151\x64")])) {
            goto HvAM1;
        }
        goto m3Vw0;
        DZTuW:
        AWxUj:
        goto iecvH;
        Oq3As:
        return;
        goto oap4G;
        E4jSX:
        return;
        goto eV50p;
        uEtaX:
        foreach ($nL3wR as $Kvp0C => $dxVqA) {
            goto sCS6O;
            Z1URq:
            fW6wM:
            goto xpX31;
            sCS6O:
            if (!isset($this->request->get[$Kvp0C])) {
                goto fW6wM;
            }
            goto V1Dd6;
            Uk5NR:
            $this->request->get[$Kvp0C . "\x5f\164\x65\x6d\x70"] = $nL3wR[$Kvp0C];
            goto r2hwZ;
            r2hwZ:
            unset($this->request->get[$Kvp0C]);
            goto Z1URq;
            V1Dd6:
            $nL3wR[$Kvp0C] = $this->request->get[$Kvp0C];
            goto Uk5NR;
            xpX31:
            Ph2mY:
            goto F2rcX;
            F2rcX:
        }
        goto sRLz2;
        Ngf6H:
        S9Wyd:
        goto MwrSp;
        dE5md:
        fVAE5:
        goto Q_L3_;
        V6kRd:
        EQv1E:
        goto E2HxK;
        wo4bR:
        if ($xZ8nY) {
            goto dK0jp;
        }
        goto dF3n4;
        Ee210:
        if (!isset($W6cO4["\162\x65\x71\x75\x65\163\164\x47\145\x74"]["\x6d\x66\x70\x5f\x70\141\x74\x68"])) {
            goto mPYnM;
        }
        goto OVm7f;
        mTXnZ:
        $EEo8Z = $this->model_module_mega_filter->getAttributes($OH713, $eh5vP["\x5f\151\144\x78"], $eh5vP["\x62\x61\x73\x65\137\x61\x74\164\x72\x69\x62\x73"], $eh5vP["\141\164\x74\162\151\142\163"], $eh5vP["\157\160\x74\151\x6f\156\x73"], $eh5vP["\146\151\x6c\x74\145\162\x73"], empty($eh5vP["\x63\x61\x74\145\147\x6f\162\x69\x65\x73"]) ? array() : $eh5vP["\143\141\164\145\147\x6f\162\151\x65\x73"], empty($eh5vP["\x76\x65\150\x69\x63\154\145\x73"]) ? array() : $eh5vP["\x76\145\150\151\143\x6c\x65\163"]);
        goto SuAGr;
        b_yIW:
        if (!(in_array($R0nBD, array("\x70\x72\x6f\144\x75\x63\x74\57\x73\145\141\162\x63\x68")) && empty($this->request->get["\x73\145\x61\162\143\x68"]) && empty($this->request->get["\164\x61\x67"]))) {
            goto eixFb;
        }
        goto X3xzM;
        g5jdf:
        return;
        goto Jn9nR;
        IwUVE:
        array_unshift($Q0Yoj, "\144\x69\162\x65\x63\164\151\157\x6e\137" . $this->config->get("\x63\157\x6e\146\x69\147\137\154\x61\x6e\147\x75\141\x67\x65\x5f\151\144") . "\56\152\163\x3f\x76" . $W6cO4["\137\x76"]);
        goto GUL9P;
        UgDGa:
        if (!empty($eh5vP["\x63\x61\x74\145\x67\157\x72\151\x65\x73"])) {
            goto kFWh_;
        }
        goto uyIql;
        F1SP8:
        $W6cO4["\x6a\x6f\x6f\137\143\141\162\164"] = $XI1X9;
        goto i3p19;
        EANWD:
        eixFb:
        goto QuzNM;
        m2S84:
        k17RV:
        goto gwBo1;
        sRLz2:
        XvC1w:
        goto R6590;
        Iqj6M:
        $this->a1OkdYsKmEat1a("\131\157\165\162\40\x4f\x70\145\156\103\141\x72\x74\x20\162\x65\x71\x75\151\162\x65\x73\40\126\x51\x4d\157\144\40\151\156\40\x76\145\x72\163\151\157\156\40\62\x2e\x36\x2e\x31\x20\157\x72\40\154\141\x74\x65\162\x2e\74\x62\x72\x20\x2f\x3e\131\157\165\162\40\x76\x65\162\x73\x69\x6f\x6e\x20\x6f\x66\40\x56\121\x4d\157\x64\x20\151\163\40\x74\157\157\x20\157\154\144\x2e\x20\x50\154\x65\141\163\x65\40\x75\x70\147\x72\x61\144\145\x20\151\x74\40\x74\x6f\40\164\150\145\x20\154\x61\x74\145\163\164\40\166\x65\x72\163\151\157\x6e\56", true);
        goto Aets3;
        Qsej8:
        $this->document->addScript($this->a2aGukWUZiqu2a($this->url->link("\x6d\x6f\x64\165\x6c\145\57\x6d\145\x67\x61\x5f\146\x69\x6c\164\x65\x72\x2f\152\163\x5f\144\x69\x72\145\x63\164\151\157\x6e", '', "\x53\x53\114")));
        goto dwPDO;
        Rzdke:
        array_unshift($Q0Yoj, "\144\151\162\x65\x63\x74\151\x6f\x6e\137" . $this->config->get("\x63\x6f\156\146\x69\x67\x5f\x6c\x61\156\147\165\141\147\x65\137\x69\144") . "\x2e\x6a\x73\x3f\x76" . $W6cO4["\x5f\x76"]);
        goto KDm9X;
        UUSAL:
        $W6cO4["\147\145\164\123\171\x6d\142\157\x6c\114\x65\146\164"] = $this->currency->getSymbolLeft(isset($this->session->data["\143\x75\162\162\x65\x6e\143\171"]) ? $this->session->data["\143\x75\x72\x72\145\156\x63\171"] : '');
        goto gwatG;
        Ahv49:
        if (empty($k0FPF["\150\151\x64\145\x5f\143\x61\164\x65\147\157\162\171\x5f\151\144"])) {
            goto o3kMb;
        }
        goto OOhcY;
        M1HfB:
        foreach ($mirrY as $lfJN5) {
            goto FD0Av;
            QPbA1:
            return;
            goto DbG4p;
            DbG4p:
            IpwQB:
            goto q3ucx;
            FD0Av:
            if (!in_array($lfJN5, $k0FPF["\150\x69\x64\x65\x5f\x63\x61\x74\145\147\157\162\x79\x5f\x69\x64"])) {
                goto IpwQB;
            }
            goto QPbA1;
            q3ucx:
            o1iqR:
            goto so6QB;
            so6QB:
        }
        goto Ngf6H;
        YKA0I:
        if (!($Zg1gy && empty($eh5vP["\166\x65\x68\x69\143\x6c\x65\163"]))) {
            goto e808r;
        }
        goto vswd9;
        buqK3:
        $mirrY = explode("\137", $this->request->get["\x70\x61\164\150"]);
        goto UvuHV;
        NJGRp:
        if (is_writable(DIR_SYSTEM . "\56\x2e\x2f\143\141\164\141\x6c\x6f\x67\x2f\x76\151\145\x77\x2f\x6a\x61\166\x61\163\143\x72\151\160\164\x2f\x6d\146")) {
            goto pdZol;
        }
        goto Qsej8;
        CtGKX:
        $W6cO4["\x61\152\x61\170\x47\145\x74\111\x6e\146\x6f\x55\x72\154"] = $this->a2aGukWUZiqu2a($this->url->link("\155\157\x64\165\x6c\x65\x2f\155\145\x67\x61\137\146\x69\154\164\x65\162\x2f\x67\x65\x74\x61\x6a\141\x78\151\x6e\x66\x6f", '', "\123\x53\x4c"));
        goto zJHlb;
        sAcdb:
        foreach ($EEo8Z as $Kvp0C => $dxVqA) {
            goto I2l6v;
            hpNxP:
            raxIG:
            goto qTkH0;
            I2l6v:
            if (!($dxVqA["\x62\x61\x73\145\137\x74\171\160\x65"] != "\x70\162\x69\143\145")) {
                goto raxIG;
            }
            goto knjrz;
            knjrz:
            $sMa62[] = $dxVqA;
            goto hpNxP;
            qTkH0:
            AjctU:
            goto Vkpxm;
            Vkpxm:
        }
        goto bxBur;
        bxBur:
        uWgg0:
        goto zZj8I;
        jO4Yd:
        xoLnn:
        goto LYKpQ;
        gT1Gt:
        if (!(in_array($R0nBD, array("\160\162\x6f\144\165\x63\x74\x2f\155\141\x6e\x75\x66\141\x63\164\165\162\x65\162", "\160\162\x6f\x64\x75\143\x74\x2f\155\x61\156\x75\146\141\x63\x74\x75\162\145\x72\x2f\x69\156\146\157")) && isset($AVBJW["\x6d\x61\156\165\x66\141\143\164\x75\x72\x65\162\x73"]))) {
            goto L5U8U;
        }
        goto ubovX;
        WCClq:
        $Zg1gy = $this->config->get("\x6d\x66\x69\x6c\164\x65\x72\x5f\166\145\150\151\143\154\145\x5f\x76\145\x72\163\x69\157\156") && $this->config->get("\x6d\x66\x69\x6c\164\145\x72\137\166\x65\x68\151\143\x6c\x65\x5f\154\151\143\x65\156\163\x65");
        goto YKA0I;
        Aets3:
        return;
        goto GL8CI;
        yaGJ4:
        $W6cO4["\x6d\151\152\157\x5f\x73\x68\157\160"] = $nwQXX;
        goto F1SP8;
        kPCFf:
        $OH713->_setCache($kDP9W, $EEo8Z);
        goto gSkTs;
        lt_jh:
        as35q:
        goto Pzn4Q;
        JgaFP:
        if (class_exists("\126\x51\x4d\x6f\x64")) {
            goto NUaTI;
        }
        goto Qgee_;
        D3OU5:
        Jo7BI:
        goto WdueD;
        Jefwe:
        $W6cO4["\137\162\157\165\164\145"] = base64_encode($OH713->route());
        goto SCXMu;
        XFXFh:
        KtIp7:
        goto om8Kv;
        JVPsk:
        if (!in_array($lfJN5, $k0FPF["\x68\x69\144\x65\137\x63\x61\x74\145\x67\x6f\x72\171\x5f\x69\144"])) {
            goto Zn1mQ;
        }
        goto oHLUi;
        wfEyr:
        foreach ($qXLQE as $Zijfy) {
            goto F1JzC;
            GgQtD:
            $Zijfy = str_replace("\56\143\x73\163\x3f\166" . $W6cO4["\137\x76"], "\x2e\x63\163\x73", $Zijfy);
            goto FXRc6;
            F1JzC:
            if (empty($Y1Wds["\x6d\151\x6e\151\146\171\137\x73\165\160\x70\x6f\162\164"])) {
                goto VAdbe;
            }
            goto GgQtD;
            bFpxu:
            $this->document->addStyle($Zijfy);
            goto xkUIN;
            FXRc6:
            VAdbe:
            goto bFpxu;
            xkUIN:
            b_1kb:
            goto V7nd5;
            V7nd5:
        }
        goto IsVfu;
        xfPs0:
        qCTe_:
        goto guk6L;
        LQkPP:
        goto EFnzJ;
        goto EvQmj;
        LKvoB:
        eGlfK:
        goto cMb9x;
        zZj8I:
        $EEo8Z = $sMa62;
        goto V6kRd;
        e7lH9:
        zlAUC:
        goto CkEa3;
        u9LZI:
        L2d7K:
        goto u_ILL;
        L3hbS:
        goto AxzpC;
        goto Yct9j;
        g8zrP:
        kFWh_:
        goto WCClq;
        yV7IM:
        RRzF5:
        goto A_Xue;
        f5ejP:
        Wj9lI:
        goto lt49n;
        QX9Yv:
        return;
        goto a68I_;
        SCXMu:
        $W6cO4["\137\162\157\x75\x74\x65\x50\162\x6f\x64\x75\x63\164"] = base64_encode("\160\x72\157\144\x75\x63\164\x2f\x70\x72\x6f\x64\x75\143\164");
        goto qr0qf;
        s1eze:
        wQIkL:
        goto nlmaF;
        m2OCW:
        $W6cO4 = $this->language->load("\155\157\144\x75\154\145\x2f\155\x65\147\x61\x5f\146\151\x6c\x74\x65\162");
        goto BnBgF;
        f_Bzq:
        $XI1X9 = defined("\x4a\x4f\x4f\103\101\122\124\137\123\x49\x54\105\137\x55\x52\114") ? array("\x73\x69\164\145\x5f\x75\162\154" => $this->a2aGukWUZiqu2a(JOOCART_SITE_URL), "\155\141\x69\x6e\x5f\x75\162\154" => $this->a2aGukWUZiqu2a($this->url->link('', '', "\123\123\x4c"))) : false;
        goto xIH54;
        EI05j:
        file_put_contents(DIR_SYSTEM . "\56\x2e\x2f\x63\141\x74\x61\154\157\147\57\x76\x69\x65\167\x2f\164\150\x65\x6d\145\x2f\144\x65\x66\141\165\154\x74\57\x73\164\x79\x6c\145\x73\150\x65\x65\164\x2f\x6d\x66\x2f\x63\157\155\142\x69\156\145\x64\x2e\143\x73\163", $ZgBae);
        goto QgNkj;
        a68I_:
        goto dtgH9;
        goto ymE9_;
        eqcUu:
        SCN8i:
        goto Pm8RN;
        TrjtX:
        return;
        goto yy8Rd;
        jCNaH:
        $W6cO4["\x68\x69\x64\x65\137\x63\x6f\156\x74\x61\151\156\145\x72"] = true;
        goto HKfKo;
        gSkTs:
        KSuR8:
        goto guMGy;
        JxXm7:
        return $this->load->view((version_compare(VERSION, "\x32\56\62\56\60\56\x30", "\x3e\75") ? '' : $this->config->get("\143\157\156\146\151\x67\x5f\x74\x65\155\x70\x6c\x61\164\145") . "\x2f\164\145\x6d\160\154\x61\164\145\x2f") . "\x6d\157\x64\165\154\x65\57\155\x65\147\x61\x5f\146\x69\154\164\145\x72\56\164\160\x6c", $W6cO4);
        goto uOLAt;
        HpzaD:
        return $this->load->view((version_compare(VERSION, "\62\x2e\62\x2e\x30\x2e\60", "\76\x3d") ? '' : "\144\145\146\141\165\x6c\164\57\x74\x65\x6d\160\x6c\x61\164\x65\57") . "\x6d\157\x64\165\x6c\145\57\155\x65\147\x61\x5f\146\151\x6c\x74\x65\x72\56\x74\160\154", $W6cO4);
        goto LQkPP;
        X3xzM:
        $EEo8Z = array();
        goto EANWD;
        esjJa:
        $W6cO4["\x73\145\157\x5f\141\154\x69\x61\163"] = empty($this->request->get["\x6d\146\160\x5f\163\x65\x6f\137\141\x6c\x69\x61\x73"]) ? '' : $this->request->get["\155\146\160\x5f\163\x65\157\137\141\154\151\x61\163"];
        goto Hr9QU;
        lUWiQ:
        foreach ($qXLQE as $Zijfy) {
            goto nAcA6;
            T3lRz:
            $ZgBae .= $ZgBae ? "\12\xa" : '';
            goto V5g0U;
            nAcA6:
            $Zijfy = str_replace("\x2e\x63\x73\163\x3f\x76" . $W6cO4["\x5f\166"], "\56\143\163\x73", $Zijfy);
            goto T3lRz;
            V5g0U:
            $ZgBae .= file_get_contents(DIR_SYSTEM . "\x2e\x2e\57" . $Zijfy);
            goto QqGSU;
            QqGSU:
            pUAdl:
            goto d4hLj;
            d4hLj:
        }
        goto pdgMO;
        fHeOV:
        HvAM1:
        goto YQUB1;
        r8Sar:
        foreach ($EEo8Z as $Kvp0C => $dxVqA) {
            goto puZzd;
            CpiEz:
            goto obYMR;
            goto mJo3i;
            puZzd:
            if (!($dxVqA["\x62\141\163\145\x5f\164\171\160\x65"] == "\x70\162\x69\143\145")) {
                goto nxibZ;
            }
            goto HAUeP;
            mJo3i:
            nxibZ:
            goto hfEsb;
            HAUeP:
            $xZ8nY = true;
            goto CpiEz;
            hfEsb:
            aehFG:
            goto m_7dV;
            m_7dV:
        }
        goto VRNg1;
        Tzt6Q:
        bNHoP:
        goto geBFg;
        OOhcY:
        $mirrY = explode("\x5f", $this->request->get["\160\141\x74\150"]);
        goto hWeim;
        bqnAe:
        dtgH9:
        goto jK6Ns;
        MwrSp:
        AxzpC:
        goto Ig8oC;
        VRNg1:
        obYMR:
        goto wo4bR;
        GL8CI:
        ZB_3M:
        goto K7sf3;
        vswd9:
        $eh5vP["\x76\x65\x68\151\143\154\x65\x73"] = empty($k0FPF["\x76\145\x68\151\143\x6c\145\x73"]) ? array() : $k0FPF["\x76\x65\150\151\x63\x6c\145\163"];
        goto m4ts2;
        IuWR4:
        file_put_contents(DIR_SYSTEM . "\56\56\57\143\x61\x74\x61\x6c\157\x67\57\x76\x69\145\167\57\x6a\141\x76\141\x73\x63\x72\x69\x70\164\x2f\155\146\x2f\143\157\155\142\151\x6e\x65\x64\x2e\x6a\163", $a0iyp);
        goto yV7IM;
        ij3AU:
        $a0iyp = '';
        goto SRrfN;
        dxClV:
        xD7OK:
        goto GjP99;
        oWHyU:
        $eh5vP["\142\141\x73\145\137\141\164\164\162\x69\x62\x73"] = empty($k0FPF["\142\141\x73\x65\137\x61\164\x74\162\x69\x62\163"]) ? array() : $k0FPF["\142\141\163\145\137\x61\x74\164\162\x69\x62\x73"];
        goto xfPs0;
        S2mzr:
        return;
        goto u9LZI;
        JZNJQ:
        $W6cO4["\137\151\x64\x78"] = $eh5vP["\x5f\151\x64\x78"];
        goto Jefwe;
        tVfeB:
        $nL3wR = array("\x6d\146\160" => null);
        goto uEtaX;
        q581r:
        $k0FPF = json_decode($k0FPF["\x73\x65\164\x74\151\x6e\x67\163"], true);
        goto bqnAe;
        p4Vqv:
        if (file_exists(DIR_TEMPLATE . $this->config->get("\143\x6f\156\x66\x69\147\137\x74\145\x6d\160\154\141\x74\x65") . "\x2f\x74\145\x6d\x70\x6c\x61\164\145\x2f\155\157\144\x75\154\145\57\x6d\145\147\141\137\x66\x69\x6c\x74\145\x72\x2e\164\160\x6c")) {
            goto gxCPq;
        }
        goto HpzaD;
        yy8Rd:
        obWL0:
        goto Nj4fR;
        xL_5P:
        foreach ($k0FPF["\x63\157\x6e\146\151\147\165\162\141\164\151\x6f\156"] as $Kvp0C => $dxVqA) {
            $Y1Wds[$Kvp0C] = $dxVqA;
            VH_Nw:
        }
        goto B38y9;
        fNpUH:
        HdfJ0:
        goto nUqIq;
        B38y9:
        pNXLW:
        goto dxClV;
        LYKpQ:
        if (empty($W6cO4["\x64\151\163\160\x6c\x61\x79\101\x6c\167\141\171\x73\x41\163\127\x69\x64\147\145\x74"])) {
            goto U1o1E;
        }
        goto zY26I;
        UTVEY:
        $lfJN5 = end($mirrY);
        goto CSygf;
        C5Hhz:
        $W6cO4["\162\145\x71\165\145\x73\164\x47\145\164"]["\160\x61\x74\x68\x5f\x61\x6c\x69\141\x73\145\163"] = implode("\137", MegaFilterCore::pathToAliases($this, $W6cO4["\x72\x65\x71\x75\145\x73\x74\107\145\x74"]["\x70\x61\x74\150"]));
        goto jO4Yd;
        A_Xue:
        $Q0Yoj = array("\x63\x6f\155\x62\151\x6e\x65\x64\x2e\x6a\x73\x3f\166" . $W6cO4["\x5f\x76"]);
        goto hujzr;
        I_S8L:
        if (empty($k0FPF["\x63\157\156\x66\x69\147\x75\x72\141\164\x69\x6f\x6e"])) {
            goto xD7OK;
        }
        goto xL_5P;
        dit18:
        goto pQx17;
        goto J82rK;
        u_ILL:
        if (!(empty($this->a5CXdpESIGYj5a["\154\x6c\x6c"]) || $this->a5CXdpESIGYj5a["\154\x6c\154"] != "\155\146")) {
            goto LCX0x;
        }
        goto E4jSX;
        hdJ7K:
        if (!empty($eh5vP["\x66\x69\x6c\x74\x65\x72\x73"])) {
            goto zZnBZ;
        }
        goto Xlc0_;
        Sfptc:
        MijoShop::get()->addHeader(JPATH_MIJOSHOP_OC . "\57\143\x61\164\x61\154\x6f\147\x2f\166\151\x65\167\x2f\164\150\145\x6d\145\57" . $this->config->get("\143\157\156\x66\x69\x67\137\x74\145\x6d\x70\154\141\x74\x65") . "\57\163\x74\x79\x6c\145\x73\150\x65\x65\164\57\155\146\x2f\x73\164\x79\154\x65\56\x63\163\x73");
        goto wwLbw;
        ISIK9:
        if (method_exists($this->a4tdqSKCEjyr4a, "\147\145\x74\x61\152\141\x78\x6d\157\x64\x75\154\145")) {
            goto FjvQN;
        }
        goto pLFmv;
        yQt_P:
        MijoShop::get()->addHeader(JPATH_MIJOSHOP_OC . "\57\143\x61\164\141\x6c\x6f\147\57\166\151\x65\x77\57\164\150\x65\x6d\145\x2f\x64\x65\x66\x61\x75\x6c\x74\x2f\x73\x74\x79\x6c\x65\163\150\145\x65\164\57\155\x66\57\163\164\x79\x6c\x65\56\143\163\x73");
        goto RhmEG;
        C0VHb:
        $ZgBae = '';
        goto lUWiQ;
        qIRNz:
        $W6cO4["\x73\x6d\160"] = array("\x69\163\111\x6e\x73\x74\141\154\x6c\145\x64" => $this->config->get("\163\x6d\160\x5f\x69\163\137\x69\156\163\x74\x61\x6c\x6c"), "\x64\x69\x73\x61\x62\154\145\103\x6f\x6e\166\x65\162\164\x55\162\154\163" => $this->config->get("\x73\x6d\x70\137\x64\151\163\x61\142\x6c\145\137\x63\157\156\166\x65\x72\164\137\x75\x72\x6c\163"));
        goto oI6Qv;
        mnyZN:
        if (!(version_compare(VERSION, "\62\x2e\x32\x2e\60\56\x30", "\x3e\x3d") && version_compare(VQMod::$_vqversion, "\62\x2e\66\x2e\61", "\74") && empty(VQMOD::$_virtualMFP))) {
            goto ZB_3M;
        }
        goto Iqj6M;
        Jn9nR:
        rQG93:
        goto XO43N;
        ubovX:
        unset($EEo8Z[$AVBJW["\x6d\x61\x6e\x75\x66\x61\x63\164\x75\x72\x65\162\163"]]);
        goto m1uw7;
        PXFAK:
        $qXLQE = array("\x63\x61\164\x61\x6c\x6f\147\57\x76\x69\145\167\x2f\x74\x68\x65\x6d\x65\x2f\144\145\x66\x61\x75\154\x74\57\163\164\x79\154\x65\x73\150\145\145\x74\x2f\x6d\x66\57\x63\157\x6d\x62\x69\156\x65\x64\x2e\143\163\x73\77\166" . $W6cO4["\137\166"]);
        goto mDqkP;
        wMs8v:
        foreach ($Q0Yoj as $Zijfy) {
            MijoShop::getClass("\x62\x61\163\145")->addHeader(JPATH_MIJOSHOP_OC . "\x2f\143\x61\164\x61\x6c\x6f\x67\57\x76\x69\145\x77\x2f\x6a\x61\x76\141\163\x63\162\151\x70\164\x2f\x6d\x66\x2f" . str_replace("\x2e\152\163\x3f\x76" . $W6cO4["\x5f\166"], "\56\x6a\163", $Zijfy), false);
            D9LPj:
        }
        goto D3OU5;
        GUL9P:
        JedtR:
        goto U3gps;
        f09hj:
        if ($this->config->get("\x6d\x66\151\154\x74\145\x72\137\x6c\151\x63\x65\x6e\x73\145")) {
            goto syXQr;
        }
        goto ZKV6w;
        y5RpN:
        $R0nBD = isset($this->request->get["\162\157\x75\x74\145"]) ? $this->request->get["\x72\x6f\165\164\x65"] : NULL;
        goto gT1Gt;
        riS1t:
        $W6cO4["\x70\141\162\x61\155\163"] = $OH713->getParseParams();
        goto Cj8Xx;
        Qgee_:
        $this->a1OkdYsKmEat1a("\115\x65\147\x61\x20\106\151\x6c\164\145\162\x20\120\x52\x4f\x20\x74\x6f\40\x77\x6f\x72\153\40\160\162\157\160\145\x72\x6c\171\40\162\145\x71\x75\151\x72\145\x73\40\141\156\x20\x69\156\x73\164\x61\154\x6c\145\144\40\126\x51\115\x6f\x64\x2e", true);
        goto Oq3As;
        eCkcE:
        mPYnM:
        goto rQ3a6;
        p09rJ:
        $this->a1OkdYsKmEat1a("\x54\150\145\162\x65\40\151\x73\x20\x61\x20\x63\x6f\x6e\146\154\x69\x63\x74\x20\x4d\x65\x67\x61\x20\106\151\154\164\x65\162\40\120\122\x4f\x20\167\151\164\x68\40\171\x6f\x75\x72\40\164\145\x6d\x70\154\x61\x74\x65\x20\157\x72\40\x6f\x74\150\145\x72\x20\145\170\x74\145\156\x73\x69\157\x6e\40\x2d\x20\74\x61\40\150\x72\x65\146\x3d\x22\x68\164\x74\160\x3a\57\x2f\146\x6f\x72\x75\155\56\157\x63\x64\x65\x6d\157\56\x65\165\57\x22\40\x74\x61\162\x67\x65\164\x3d\x22\x5f\x62\154\141\156\x6b\x22\x20\x73\x74\x79\x6c\145\75\x22\x74\x65\170\164\55\x64\x65\x63\157\162\141\x74\x69\x6f\x6e\72\x75\156\144\145\162\154\151\156\x65\42\x3e\160\154\145\x61\163\x65\40\x66\151\156\x64\x20\141\40\x73\x6f\154\x75\164\x69\157\x6e\40\x6f\x6e\x20\157\165\162\40\146\157\162\x75\155\x3c\x2f\141\x3e\56");
        goto WsdMR;
        bQdSg:
        U1o1E:
        goto qzY33;
        jFYDt:
        if (!($k0FPF["\x73\x74\141\164\x75\163"] == "\x70\x63" && $CT_E1)) {
            goto rQG93;
        }
        goto g5jdf;
        XO43N:
        if (!($k0FPF["\163\164\141\164\x75\x73"] == "\155\157\x62\151\x6c\145" && !$CT_E1)) {
            goto dS8MH;
        }
        goto aZgJ6;
        YRgsy:
    }
}