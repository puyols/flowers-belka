<?php


class ControllerExtensionModuleFilterVier extends Controller
{
    private $name_mod = "filter_vier";
    private $tema_default = "filter_vier";
    private $what_versi = NULL;
    private $versi_put = "module";
    private $mod_ext = "extension/module";
    private $load_mod = "model_module_filter_vier";
    private $ext_tpl = ".tpl";
    private $type_mod = NULL;
    private $name_user_css = "user_style";
    private $dir_style = NULL;
    private $style_mod = "view/theme/default/stylesheet/filter_vier/";
    private $dir_img = "view/theme/default/image/filter_vier/";
    private $put_img = NULL;
    private $tabl_ats = false;
    private $tabl_ats_status = "attribute_text_select_status";
    private $dir_check = "select_checks/";
    private $dir_mobil = "mobil_versi/";
    private $put_mobil_version = NULL;
    private $text_other_css = NULL;
    private $flag_seo_url = false;
    private $flag_add_group_trans = false;
    private $index_attrib = "attrib_lang";
    private $html_tag = false;
    private $scroll_item = 24;
    private $item_default = 3;
    private $img_default = 25;
    private $arr_lang = array();
    private $cach_prev = "sql";
    private $cache_ext = "cache";
    private $cache_dir = "storage/cache_fv/";
    private $cache_3 = "cache_fv/";
    private $yes_dir_cache = "";
    private $set_2 = "_url_set";
    private $set_3 = "_lic";
    private $set_4 = "_hl";
    private $set_5 = "_set_cats";
    private $set_6 = "_css";
    private $min_width_gorizont = "767";
    private $width_mobil = "767";
    private $name_css_file = "my_style";
    private $where_attr = NULL;
    private $where_optv = NULL;
    private $view_attrb = array();
    private $view_optv = array();
    private $duble_url = array();
    private $text_translit = NULL;
    private $new_pars = NULL;
    private $arr_tab = array("seo_url", "hand_links", "set_cats", "style_filter");
    private $set_cats_pole = array("status" => 0, "ignor_attrb" => 0, "child_cats" => NULL, "view_attrb" => array());
    private $pole_attrb_display = array("button", "slider", "select", "radio", "image");
    private $pole_optv_display = array("button", "select", "radio", "image");
    private $flag_update = 0;
    private $pif = array();
    private $flag_diap = 0;
    private $diap_semicolon = ";";
    private $diap_tire = "-";
    private $token = NULL;
    private $u_token = "token";
    private $token_token = "";
    private $err_curl = NULL;
    private $error = array();
    public $data = array();
    private $result_base = NULL;
    private $model_status = "";
    private $ssl = "SSL";
    public function __construct($registry)
    {
        parent::__construct($registry);
        $this->model_status = $this->name_mod . "_status";
        $this->what_versi = $this->whatVersion();
        if (3000 <= $this->what_versi) {
            $this->versi_put = "extension/module";
            $this->load_mod = "model_extension_module_filter_vier";
            $this->mod_ext = "marketplace/extension";
            $this->type_mod = "&type=module";
            $this->ext_tpl = NULL;
            $this->model_status = "module_" . $this->model_status;
            $this->u_token = "user_token";
            $this->tabl_ats_status = "module_" . $this->tabl_ats_status;
        } else {
            if (2300 <= $this->what_versi) {
                $this->versi_put = "extension/module";
                $this->load_mod = "model_extension_module_filter_vier";
                $this->mod_ext = "extension/extension";
                $this->type_mod = "&type=module";
                $this->ext_tpl = NULL;
            }
        }
        $this->setIniFile();
        $this->load->model($this->versi_put . "/" . $this->name_mod);
        $this->arr_lang = $this->load->language($this->versi_put . "/" . $this->name_mod);
        $this->getLangModule($this->arr_lang, array("legend_", "_legend_"));
        $this->data["name_mod"] = $this->name_mod;
        if ($this->what_versi < 2000) {
            $this->data["versi_cms1"] = true;
        } else {
            $this->data["versi_cms1"] = false;
            $this->ssl = true;
        }
        $versi_cms = $this->what_versi < 2200 ? true : false;
        $this->data["languages"] = $this->{$this->load_mod}->getLangs($versi_cms);
        $this->text_translit = $this->{$this->load_mod}->textTranslit();
        $this->data["token"] = $this->session->data[$this->u_token];
        $this->token = $this->data["token"];
        $this->data["ajax_redir"] = "index.php?route=" . $this->versi_put . "/" . $this->name_mod;
        $this->token_token = $this->u_token . "=" . $this->token;
        $this->data["ajax_token"] = "&" . $this->token_token;
        $this->data["ajax_put"] = "index.php?route=" . $this->versi_put . "/" . $this->name_mod . "/ajs_post&" . $this->token_token;
        $this->data["ajax_autocomplete"] = "index.php?route=" . $this->versi_put . "/" . $this->name_mod . "/autocomplete&" . $this->token_token;
        $this->dir_style = DIR_CATALOG . $this->style_mod;
        $this->put_img = DIR_CATALOG . $this->dir_img;
        $this->put_mobil_version = $this->dir_style . $this->dir_mobil;
        $this->data["bloc_bott"] = true;
        $this->data["bloc_bott_save"] = true;
        $this->data["arr_tab"] = $this->arr_tab;
        $this->data["tab_nav"] = array();
        $this->data["ckeditor"] = 0;
        $this->new_pars = $this->{$this->load_mod}->newPars();
        $this->data["name_route"] = array("category_id" => $this->data["legnd_hl_category"], "manufacturer_id" => $this->data["legnd_hl_manufacturer"], "special" => $this->data["legnd_hl_special"]);
    }
    public function index()
    {
        $this->data["shabl"] = $_obfuscated_0D09162A1A223E0D09321C253D38311D08042B1B0A3932_ = "base";
        $this->data["action"] = $this->url->link($this->versi_put . "/" . $this->name_mod, $this->token_token, $this->ssl);
        $_obfuscated_0D1C2D301002251B1C0434142B095B15162E5B26211801_ = $this->data["action"];
        $this->data["cancel"] = $this->url->link($this->mod_ext, $this->token_token . $this->type_mod, $this->ssl);
        $_obfuscated_0D01111F2C32293F2B260D3E2C3F362730121A2A3B3911_ = $this->data["cancel"];
        $this->data["flag_diap"] = $this->flag_diap;
        $this->data["success"] = NULL;
        if ($this->what_versi < 2000) {
            $this->data["modules"] = array();
            if (isset($_POST["filter_vier_module"])) {
                $this->data["modules"] = $this->request->post["filter_vier_module"];
            } else {
                if (($_obfuscated_0D190A0733142930110821180D0616212E1F011A172E22_ = $this->config->get("filter_vier_module")) && is_array($_obfuscated_0D190A0733142930110821180D0616212E1F011A172E22_)) {
                    $this->data["modules"] = $_obfuscated_0D190A0733142930110821180D0616212E1F011A172E22_;
                }
            }
            $_obfuscated_0D15303F311B1A1F0313195B0B28233305230D22122722_ = array($this->model_status, "filter_vier_setting", "filter_vier_cache", "filter_vier_cpu", "filter_vier_module");
        } else {
            $_obfuscated_0D15303F311B1A1F0313195B0B28233305230D22122722_ = array($this->model_status, "filter_vier_setting", "filter_vier_cache", "filter_vier_cpu");
        }
        $this->viewList($_obfuscated_0D15303F311B1A1F0313195B0B28233305230D22122722_);
        if ($this->data["tab_nav"]) {
            if (isset($_POST["save"]) && $this->validate() && ($_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_ = $this->saveBase($this->request->post))) {
                $result = $this->result_base;
                if ($this->clearCache()) {
                    $result .= ", " . $this->data["legnd_clear_cache_yes"] . "-" . $this->yes_dir_cache;
                }
                $this->load->model("setting/setting");
                if (3000 <= $this->what_versi && isset($_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_[$this->model_status])) {
                    $_obfuscated_0D371E3F31355C0F2D0E210C1F1D1F0A16062F191F2E22_ = array();
                    $_obfuscated_0D371E3F31355C0F2D0E210C1F1D1F0A16062F191F2E22_[$this->model_status] = $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_[$this->model_status];
                    $this->model_setting_setting->editSetting($this->model_status, $_obfuscated_0D371E3F31355C0F2D0E210C1F1D1F0A16062F191F2E22_);
                }
                $this->model_setting_setting->editSetting($this->name_mod, $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_);
                $this->session->data["success"] = $this->data["text_success"] . $result;
                $this->redir($_obfuscated_0D01111F2C32293F2B260D3E2C3F362730121A2A3B3911_);
            }
            $_obfuscated_0D1B24061F1C3E3C353D1A22312208061D1F1613361601_ = array();
            $this->data["arr_opis"] = array("category", "manufacturer");
            if (isset($_POST["description"])) {
                $_obfuscated_0D290A2C270736371D2A2F275B2933165C243202030A22_ = $this->request->post["description"];
            } else {
                if (($_obfuscated_0D1B24061F1C3E3C353D1A22312208061D1F1613361601_ = $this->{$this->load_mod}->getDiscriptions()) && isset($_obfuscated_0D1B24061F1C3E3C353D1A22312208061D1F1613361601_["description"])) {
                    $_obfuscated_0D290A2C270736371D2A2F275B2933165C243202030A22_ = $_obfuscated_0D1B24061F1C3E3C353D1A22312208061D1F1613361601_["description"];
                } else {
                    $_obfuscated_0D290A2C270736371D2A2F275B2933165C243202030A22_ = array();
                }
            }
            $this->data["description"] = $_obfuscated_0D290A2C270736371D2A2F275B2933165C243202030A22_;
            if (isset($_POST["mark_description"])) {
                $_obfuscated_0D082B0223382A340A1604010A2E1E3D1D301F0D251622_ = $this->request->post["mark_description"];
            } else {
                if (isset($_obfuscated_0D1B24061F1C3E3C353D1A22312208061D1F1613361601_["mark_description"])) {
                    $_obfuscated_0D082B0223382A340A1604010A2E1E3D1D301F0D251622_ = $_obfuscated_0D1B24061F1C3E3C353D1A22312208061D1F1613361601_["mark_description"];
                } else {
                    $_obfuscated_0D082B0223382A340A1604010A2E1E3D1D301F0D251622_ = array();
                }
            }
            $this->data["mark_description"] = $_obfuscated_0D082B0223382A340A1604010A2E1E3D1D301F0D251622_;
            if (isset($_POST["lang"])) {
                $_obfuscated_0D2E101A0A22070A12085B233C3331342C350C39161201_ = $this->request->post["lang"];
            } else {
                if (isset($_obfuscated_0D1B24061F1C3E3C353D1A22312208061D1F1613361601_["lang"])) {
                    $_obfuscated_0D2E101A0A22070A12085B233C3331342C350C39161201_ = $_obfuscated_0D1B24061F1C3E3C353D1A22312208061D1F1613361601_["lang"];
                } else {
                    $_obfuscated_0D2E101A0A22070A12085B233C3331342C350C39161201_ = array();
                }
            }
            $this->data["lang_description"] = $_obfuscated_0D2E101A0A22070A12085B233C3331342C350C39161201_;
            $this->data["arr_canonical"] = array($this->data["text_no"], "1", "2", "3", "4", "5", 100 => "max");
            $this->data["pole_attrb_display"] = $this->pole_attrb_display;
            $pole_attrb_display = array_merge($this->pole_attrb_display, array("null_position"));
            $_obfuscated_0D5C221317290B1E0106265B0D0D2233281E2224151411_ = "attrb";
            foreach ($pole_attrb_display as $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_) {
                $this->data["attrb_display"][$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_] = array();
                if (isset($this->data["filter_vier_setting"][$_obfuscated_0D5C221317290B1E0106265B0D0D2233281E2224151411_][$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_])) {
                    $this->data["attrb_display"][$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_] = $this->data["filter_vier_setting"][$_obfuscated_0D5C221317290B1E0106265B0D0D2233281E2224151411_][$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_];
                }
            }
            $this->data["pole_optv_display"] = $this->pole_optv_display;
            $pole_optv_display = array_merge($this->pole_optv_display, array("null_position"));
            $_obfuscated_0D5C221317290B1E0106265B0D0D2233281E2224151411_ = "optv";
            foreach ($pole_optv_display as $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_) {
                $this->data["optv_display"][$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_] = array();
                if (isset($this->data["filter_vier_setting"][$_obfuscated_0D5C221317290B1E0106265B0D0D2233281E2224151411_][$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_])) {
                    $this->data["optv_display"][$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_] = $this->data["filter_vier_setting"][$_obfuscated_0D5C221317290B1E0106265B0D0D2233281E2224151411_][$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_];
                }
            }
            $this->data["pole_manufs_display"] = array("button", "select", "radio", "image");
            $this->data["config_currency"] = $this->config->get("config_currency");
            if (isset($this->data["filter_vier_setting"]["html_tag"])) {
                $this->html_tag = true;
            }
            $this->data["disabled_ats"] = "disabled=\"disabled\"";
            $this->data["tabl_ats_status"] = 0;
            if (($tabl_ats = $this->config->get($this->tabl_ats_status)) || $tabl_ats === "0") {
                $this->data["tabl_ats_status"] = 1;
                $this->data["disabled_ats"] = "";
            }
            $this->data["view_attributes"] = $this->viewAttributes();
            $this->data["view_options"] = $this->viewOptions();
            $this->viewRed();
        }
        $this->breadcrumbs();
        $this->getTpl();
    }
    private function breadcrumbs($shabl = NULL, $sort_fitl = NULL)
    {
        $shabl = $shabl ? "/" . $shabl : NULL;
        $this->data["breadcrumbs"] = array();
        if ($this->what_versi < 2000) {
            $_obfuscated_0D0C27342C372337270A0E2E02121A152C14091B3D1401_ = "home";
        } else {
            $_obfuscated_0D0C27342C372337270A0E2E02121A152C14091B3D1401_ = "dashboard";
        }
        $this->data["breadcrumbs"][] = array("text" => $this->data["text_home"], "href" => $this->url->link("common/" . $_obfuscated_0D0C27342C372337270A0E2E02121A152C14091B3D1401_, $this->token_token, $this->ssl));
        $this->data["breadcrumbs"][] = array("text" => $this->data["text_module"], "href" => $this->url->link($this->mod_ext, $this->token_token . $this->type_mod, $this->ssl));
        $this->data["breadcrumbs"][] = array("text" => $this->data["heading_title"], "href" => $this->url->link($this->versi_put . "/" . $this->name_mod . $shabl, $this->token_token . $sort_fitl, $this->ssl));
    }
    private function viewRed()
    {
        $_obfuscated_0D2C1E5C22102E1C5B223F40093D2D2C3E12180A390511_ = "";
        $this->data["file_lang"] = $_obfuscated_0D2C1E5C22102E1C5B223F40093D2D2C3E12180A390511_;
        $this->data["file_summer"] = true;
        if ($this->what_versi < 2000) {
            $this->data["ckeditor"] = 1;
            $this->document->addScript("view/javascript/ckeditor/ckeditor.js");
            $this->document->addScript("view/javascript/fv/ckeditor/ckeditor_init.js");
        } else {
            $this->data["ckeditor"] = $this->config->get("config_editor_default");
            if ($this->data["ckeditor"]) {
                $this->document->addScript("view/javascript/ckeditor/ckeditor.js");
                $this->document->addScript("view/javascript/ckeditor/ckeditor_init.js");
            } else {
                $_obfuscated_0D350E3B10263F3519363B3919291D15332337022B2F01_ = isset($this->data["lang"]) ? $this->data["lang"] : $this->data["code"];
                if (file_exists(DIR_APPLICATION . "view/javascript/summernote/lang/summernote-" . $_obfuscated_0D350E3B10263F3519363B3919291D15332337022B2F01_ . ".js")) {
                    $_obfuscated_0D2C1E5C22102E1C5B223F40093D2D2C3E12180A390511_ = $_obfuscated_0D350E3B10263F3519363B3919291D15332337022B2F01_;
                }
                $this->data["file_lang"] = $_obfuscated_0D2C1E5C22102E1C5B223F40093D2D2C3E12180A390511_;
                if (2300 <= $this->what_versi) {
                    $this->document->addStyle("view/javascript/summernote/summernote.css");
                    $this->document->addScript("view/javascript/summernote/summernote.js");
                    if ($_obfuscated_0D2C1E5C22102E1C5B223F40093D2D2C3E12180A390511_) {
                        $this->document->addScript("view/javascript/summernote/lang/summernote-" . $_obfuscated_0D350E3B10263F3519363B3919291D15332337022B2F01_ . ".js");
                    }
                } else {
                    if (!$_obfuscated_0D2C1E5C22102E1C5B223F40093D2D2C3E12180A390511_ && $this->what_versi < 2200) {
                        $this->data["file_summer"] = false;
                    }
                }
            }
        }
    }
    private function getTpl($file = "")
    {
        if (isset($this->error["warning"])) {
            $this->data["error_warning"] = $this->error["warning"];
        } else {
            $this->data["error_warning"] = "";
        }
        $this->data["success"] = isset($this->session->data["success"]) ? $this->session->data["success"] : NULL;
        $this->document->setTitle($this->data["title"]);
        $_obfuscated_0D382D2D2E5C383C3D2913022E0A11122F1E1D3C281832_ = 30;
        $_obfuscated_0D0A051E1A3E2E1C3835080A2B06330530363E06150311_ = "<img style='width: " . $_obfuscated_0D382D2D2E5C383C3D2913022E0A11122F1E1D3C281832_ . "px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADVklEQVR4nO1azU8TURCfedsPOKBERIWAKN48aGINKsRE40VvCsGDMXog8Yj6B5jgH+HNRMGokRI9mJh4w0QlRYIaowc1kfBVgfDlAdru7oyH0rLb3Zb9eNCm6S/Zw86bN29+72Nm3maRmaEcIIrtgCwEZBmabYq4Wloi+tMc/3KEJW0JlGFnofmkZyP1U2Po2wEoo61VIVJqqBApNVSIlBoqREoN0koUWUBER5k+t7Qp+or8azhx1/jODpFrR0qtBQAw3RThsLPJBCIiIUR2ElMufNB0et8S/3w2Vy6NiBsgIs43Rchrf43oecPM+DWTTRlELl2vO4ocUIwynRU1GBatgpEAdT2hUTxAjG+ezn3L6Mismn0RGRjt8NT55qmPgpnZKxEiSuyfGa82ynb0sOPGcI9GTv+Wbbs4UYtBymXKCJ9EGASGQEA4O9vOepUcEQTiFBAkgSEdhBSozqud1VHEIV/DCqvb0reWDuuyTVogAKpsZOUB21oLBxcYAkFrA5FaxVrPeve+JyZ9CAKD6nhQIvzp0s8tYVkRHFpesSMhEACECCaU0EBum3MSG2ecdZtZ8gebU4O77RRJSiUjpxwixGSurKhlfP3UGMLBtq9LC4vHUsIckdVdNWt2fZoDym2Y/PQwV14UIkIRhxERmZlhcvT4Hgk2fRHRdZrIlxMQRDZv2KE/1k71LdiICEwEIqyEaoztKqdWje/zE/y3kC+WohFfrmy5kcO8djHR1fgWIHujs2bqwUGEB9/N8nf39f5Yu+fyXVW14Z6O2Hm7NiuRoaU4CHFgK6PcWYsYjSoFlZZb08Hk2Wvm4T4tI/ZaNQMA3Gj7YFve2JbxGF18BQAXTEJFqbEoEukFxhQgNk4wEYWQYsmuve0A20PE9oxwd90VOzme6wtA753NpCFE4RXZ1BMpEGcc6XqEqxLFuD08G9kmSPHB8+mVCPdEiKa3wQ/f8LIiI047BXDnvtC4J8LMma2EkHY2E0aCaL7Daiz9IpgXvjI7g9lZdQcdz0UpBBwpqBDxAyXE9ygNdvoA5M/qAB6+NGJ08QUoylUvBLiz1vMhQkRhiDMWuF+R1dleT56QvztmIRIAPr794uO5y46V1eQvuNXyQ9Z/J7b+VH5zKjGUDZH/v0+OYYElTcMAAAAASUVORK5CYII=' />";
        $_obfuscated_0D3E2C1A0A1B1B0618325C1A1C153E381C1B022D2F0522_ = "<img style='width: " . $_obfuscated_0D382D2D2E5C383C3D2913022E0A11122F1E1D3C281832_ . "px;' src='data:image/png;base64,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' />";
        $_obfuscated_0D3E2221013E24280D2A353F2C1A282E1418183F0E3332_ = "<img style='width: " . $_obfuscated_0D382D2D2E5C383C3D2913022E0A11122F1E1D3C281832_ . "px;' src='data:image/png;base64,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' />";
        $_obfuscated_0D290C1F1806092A0608192E3821240A091D1D1F193932_ = "<img style='width: " . $_obfuscated_0D382D2D2E5C383C3D2913022E0A11122F1E1D3C281832_ . "px;' src='data:image/png;base64,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' />";
        $_obfuscated_0D165B0D0B37193E2C21361219173430263E3D26133811_ = array("liveoc" => array("text" => "liveopencart.ru", "href" => "https://liveopencart.ru/vier", "img" => $_obfuscated_0D3E2221013E24280D2A353F2C1A282E1418183F0E3332_), "shopoc" => array("text" => "shop.opencart-russia.ru", "href" => "https://shop.opencart-russia.ru/vier", "img" => $_obfuscated_0D290C1F1806092A0608192E3821240A091D1D1F193932_), "forumoc" => array("text" => "opencartforum.com", "href" => "https://opencartforum.com/profile/705823-vier/?tab=node_downloads_Files", "img" => $_obfuscated_0D3E2C1A0A1B1B0618325C1A1C153E381C1B022D2F0522_), "prodelo" => array("text" => "prodelo.biz", "href" => "https://prodelo.biz/vier", "img" => $_obfuscated_0D0A051E1A3E2E1C3835080A2B06330530363E06150311_));
        $this->data["avtor_bloc"] = "<div class=\"text_avtor\">" . $this->data["text_avtor"] . "</div>";
        foreach ($_obfuscated_0D165B0D0B37193E2C21361219173430263E3D26133811_ as $_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_ => $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_) {
            $this->data["avtor_bloc"] .= "<div class=\"partner " . $_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_ . "\"><a href=\"" . $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_["href"] . "\" target=\"_blank\">" . $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_["text"] . " " . $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_["img"] . "</a></div>";
        }
        if ($this->what_versi < 2000) {
            $this->document->addStyle("view/javascript/fv/responsive/responsive.css");
            $this->document->addStyle("../catalog/view/javascript/fv/font-awesome/css/font-awesome.min.css");
            $this->document->addScript("view/javascript/fv/tab.js");
            $this->document->addStyle("view/javascript/fv/tooltip/tooltipster.bundle.min.css");
            $this->document->addScript("view/javascript/fv/tooltip/tooltipster.bundle.min.js");
            $this->document->addStyle("view/stylesheet/" . $this->name_mod . ".css");
            $this->load->model("design/layout");
            $this->data["layouts"] = $this->model_design_layout->getLayouts();
            $this->template = $this->versi_put . "/" . $this->name_mod . "/" . $this->name_mod . $this->ext_tpl;
            $this->children = array("common/header", "common/footer");
            $this->response->setOutput($this->render());
        } else {
            $this->document->addStyle("view/stylesheet/" . $this->name_mod . ".css");
            $this->data["header"] = $this->load->controller("common/header");
            $this->data["column_left"] = $this->load->controller("common/column_left");
            $this->data["footer"] = $this->load->controller("common/footer");
            $this->response->setOutput($this->load->view($this->versi_put . "/" . $this->name_mod . "/" . $this->name_mod . $this->ext_tpl, $this->data));
        }
    }
    private function genTab($arr_tabs = array(), $pref_lang = "text_", $flag_sessi = true)
    {
        if ($flag_sessi) {
            $this->delSessiSucce();
        }
        if (!$arr_tabs) {
            $arr_tabs = array("general", "langs", "meta_tags", "site_map");
            $arr_tabs = array_merge($arr_tabs, $this->arr_tab);
        }
        $_obfuscated_0D2B3F105B3709065B1E2404351B185B24141908025C32_ = array();
        foreach ($arr_tabs as $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_) {
            $_obfuscated_0D2B3F105B3709065B1E2404351B185B24141908025C32_[] = array("href" => "tab-" . $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_, "txt" => $this->data[$pref_lang . $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_], "id" => $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_);
        }
        return $_obfuscated_0D2B3F105B3709065B1E2404351B185B24141908025C32_;
    }
    public function hand_links()
    {
        $this->data["shabl"] = $shabl = "hand_links";
        $this->data["bloc_bott_save"] = false;
        $_obfuscated_0D1E1A050E241C162A140104271F153B27211D23342422_ = array("link", "short_link", "route", "route_id");
        $url = "";
        $_obfuscated_0D02401D282B0514292803160723022A271A013C171011_ = "";
        if (isset($this->request->get["page"])) {
            $_obfuscated_0D0E5B2B0F383E2B0439342A5B071C16241C28320E3722_ = $this->request->get["page"];
            if (1 < $_obfuscated_0D0E5B2B0F383E2B0439342A5B071C16241C28320E3722_) {
                $_obfuscated_0D02401D282B0514292803160723022A271A013C171011_ .= "&page=" . $this->request->get["page"];
            }
        } else {
            $_obfuscated_0D0E5B2B0F383E2B0439342A5B071C16241C28320E3722_ = 1;
        }
        $sort = "";
        $_obfuscated_0D0E3D3D5C383F27401F2231013614280A362F1F0F3001_ = "asc";
        $_obfuscated_0D211B305B310E1836401B40041F273430370B1A1D5C11_ = "";
        $_obfuscated_0D0F0B2D2F1318180E3602041501122C213B1334353711_ = "";
        $_obfuscated_0D3919063F2B3814340F5C1A182F2C1E2F211B020C1101_ = "";
        if (isset($this->request->get["sort"])) {
            if (isset($this->request->get["order"])) {
                $_obfuscated_0D0F0B2D2F1318180E3602041501122C213B1334353711_ = $this->request->get["order"];
                if ($_obfuscated_0D0F0B2D2F1318180E3602041501122C213B1334353711_ == $_obfuscated_0D0E3D3D5C383F27401F2231013614280A362F1F0F3001_) {
                    $_obfuscated_0D0E3D3D5C383F27401F2231013614280A362F1F0F3001_ = "desc";
                }
            }
            $sort = $this->request->get["sort"];
            $_obfuscated_0D211B305B310E1836401B40041F273430370B1A1D5C11_ = "`" . $sort . "` " . $_obfuscated_0D0F0B2D2F1318180E3602041501122C213B1334353711_;
            $url .= "&sort=" . $sort . "&order=" . $_obfuscated_0D0F0B2D2F1318180E3602041501122C213B1334353711_;
            $_obfuscated_0D3919063F2B3814340F5C1A182F2C1E2F211B020C1101_ .= "&sort=" . $sort . "&order=" . $_obfuscated_0D0F0B2D2F1318180E3602041501122C213B1334353711_;
        }
        $_obfuscated_0D3514021C110C13282A2D0403142D1F052D5C153C1701_ = "";
        $_obfuscated_0D193D133C030C3E1C0232070C360B1C32063E182B2C01_ = array();
        $_obfuscated_0D16392D3E2F1231022234350C3F241F340313041F2532_ = 0;
        $_obfuscated_0D32380B11250A3D0A391F2A19173F312E19365C060922_ = "";
        foreach ($_obfuscated_0D1E1A050E241C162A140104271F153B27211D23342422_ as $val) {
            if (isset($_GET["filter_" . $val])) {
                $_obfuscated_0D273B062C192F38352D2D04120E2E0A5B060528091432_ = trim($this->request->get["filter_" . $val]);
                $this->data["filter_hl"][$val] = $_obfuscated_0D273B062C192F38352D2D04120E2E0A5B060528091432_;
                if ($_obfuscated_0D273B062C192F38352D2D04120E2E0A5B060528091432_) {
                    if ($val == "link" || $val == "short_link") {
                        $_obfuscated_0D193D133C030C3E1C0232070C360B1C32063E182B2C01_[] = " `" . $val . "` LIKE '%" . $this->db->escape($_obfuscated_0D273B062C192F38352D2D04120E2E0A5B060528091432_) . "%'";
                    } else {
                        if ($val == "route") {
                            if (isset($this->data["name_route"][$_obfuscated_0D273B062C192F38352D2D04120E2E0A5B060528091432_])) {
                                $_obfuscated_0D32380B11250A3D0A391F2A19173F312E19365C060922_ = $_obfuscated_0D273B062C192F38352D2D04120E2E0A5B060528091432_;
                                $_obfuscated_0D193D133C030C3E1C0232070C360B1C32063E182B2C01_[] = " `" . $val . "` = '" . $this->db->escape($_obfuscated_0D32380B11250A3D0A391F2A19173F312E19365C060922_) . "'";
                            }
                        } else {
                            if ($val == "route_id" && (int) $_obfuscated_0D273B062C192F38352D2D04120E2E0A5B060528091432_) {
                                $_obfuscated_0D16392D3E2F1231022234350C3F241F340313041F2532_ = (int) $_obfuscated_0D273B062C192F38352D2D04120E2E0A5B060528091432_;
                                $_obfuscated_0D193D133C030C3E1C0232070C360B1C32063E182B2C01_[] = " `" . $val . "` = " . $_obfuscated_0D16392D3E2F1231022234350C3F241F340313041F2532_ . " ";
                            }
                        }
                    }
                    if ($_obfuscated_0D193D133C030C3E1C0232070C360B1C32063E182B2C01_) {
                        $url .= "&filter_" . $val . "=" . $_obfuscated_0D273B062C192F38352D2D04120E2E0A5B060528091432_;
                        $_obfuscated_0D3514021C110C13282A2D0403142D1F052D5C153C1701_ .= "&filter_" . $val . "=" . $_obfuscated_0D273B062C192F38352D2D04120E2E0A5B060528091432_;
                    }
                }
            } else {
                $this->data["filter_hl"][$val] = "";
            }
        }
        $_obfuscated_0D292E112C3D371610372124265C2A2B05180B145B0D22_ = "";
        if ($_obfuscated_0D32380B11250A3D0A391F2A19173F312E19365C060922_ && $_obfuscated_0D16392D3E2F1231022234350C3F241F340313041F2532_) {
            if ($_obfuscated_0D32380B11250A3D0A391F2A19173F312E19365C060922_ == "category_id") {
                $_obfuscated_0D292E112C3D371610372124265C2A2B05180B145B0D22_ = $this->{$this->load_mod}->getCategory($_obfuscated_0D16392D3E2F1231022234350C3F241F340313041F2532_, false);
            } else {
                if ($_obfuscated_0D32380B11250A3D0A391F2A19173F312E19365C060922_ == "manufacturer_id") {
                    $_obfuscated_0D292E112C3D371610372124265C2A2B05180B145B0D22_ = $this->{$this->load_mod}->getManufacturer($_obfuscated_0D16392D3E2F1231022234350C3F241F340313041F2532_);
                }
            }
        }
        $this->data["filter_hl"]["name_route"] = $_obfuscated_0D292E112C3D371610372124265C2A2B05180B145B0D22_;
        $_obfuscated_0D2C320D352F250905220314242D13315C3932402F1122_ = "";
        if ($_obfuscated_0D193D133C030C3E1C0232070C360B1C32063E182B2C01_) {
            $_obfuscated_0D2C320D352F250905220314242D13315C3932402F1122_ = implode(" AND ", $_obfuscated_0D193D133C030C3E1C0232070C360B1C32063E182B2C01_);
        }
        $this->data["sort"] = $sort;
        $this->data["sotr_order"] = $_obfuscated_0D0E3D3D5C383F27401F2231013614280A362F1F0F3001_;
        $this->data["get_sort"] = $_obfuscated_0D3919063F2B3814340F5C1A182F2C1E2F211B020C1101_;
        $this->data["url_p"] = $_obfuscated_0D02401D282B0514292803160723022A271A013C171011_;
        $this->data["filter_url"] = $_obfuscated_0D3514021C110C13282A2D0403142D1F052D5C153C1701_;
        $_obfuscated_0D09061002102C25143D13040B2B232B2B232B2B310301_ = $this->versi_put . "/" . $this->name_mod . "/" . $shabl;
        $this->data["filter_action"] = $this->url->link($_obfuscated_0D09061002102C25143D13040B2B232B2B232B2B310301_, $this->token_token . $url, $this->ssl);
        $this->data["action"] = $this->url->link($_obfuscated_0D09061002102C25143D13040B2B232B2B232B2B310301_, $this->token_token, $this->ssl);
        $this->data["cancel"] = $this->url->link($this->mod_ext, $this->token_token . $this->type_mod, $this->ssl);
        $this->data["href_sort"] = $this->data["action"] . "&sort=link&order=" . $_obfuscated_0D0E3D3D5C383F27401F2231013614280A362F1F0F3001_ . $_obfuscated_0D3514021C110C13282A2D0403142D1F052D5C153C1701_;
        $this->data["url_filter"] = "index.php?route=" . $_obfuscated_0D09061002102C25143D13040B2B232B2B232B2B310301_ . "&" . $this->token_token . $_obfuscated_0D3919063F2B3814340F5C1A182F2C1E2F211B020C1101_;
        $_obfuscated_0D350D1535240730173F261C241D2B0A132E0305262932_ = $this->{$this->load_mod}->countPageHl();
        $this->data[$shabl] = array();
        $data = array("start" => ($_obfuscated_0D0E5B2B0F383E2B0439342A5B071C16241C28320E3722_ - 1) * $_obfuscated_0D350D1535240730173F261C241D2B0A132E0305262932_, "limit" => $_obfuscated_0D350D1535240730173F261C241D2B0A132E0305262932_);
        $results = $this->{$this->load_mod}->getHandLinks($data, $_obfuscated_0D211B305B310E1836401B40041F273430370B1A1D5C11_, $_obfuscated_0D2C320D352F250905220314242D13315C3932402F1122_);
        $_obfuscated_0D1D310E2236243D090F301C210A33152A170C19360C32_ = $this->{$this->load_mod}->getTotalHandLinks($_obfuscated_0D2C320D352F250905220314242D13315C3932402F1122_);
        $hand_links = array();
        foreach ($results as $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_) {
            $id = (int) $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["id"];
            $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_ = array();
            if ($_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["route"] == "category_id") {
                $_obfuscated_0D16392D3E2F1231022234350C3F241F340313041F2532_ = (int) $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["route_id"];
                $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_["links"]["route"] = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["route"];
                $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_["links"]["route_id"] = $_obfuscated_0D16392D3E2F1231022234350C3F241F340313041F2532_;
                if ($_obfuscated_0D16392D3E2F1231022234350C3F241F340313041F2532_ && ($_obfuscated_0D311904172E30371B1A5C1C030727073D122E16400501_ = $this->{$this->load_mod}->getCategory($_obfuscated_0D16392D3E2F1231022234350C3F241F340313041F2532_, false))) {
                    $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_["links"]["name_route"] = $_obfuscated_0D311904172E30371B1A5C1C030727073D122E16400501_;
                } else {
                    $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_["links"]["name_route"] = "";
                }
            } else {
                if ($_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["route"] == "manufacturer_id") {
                    $_obfuscated_0D16392D3E2F1231022234350C3F241F340313041F2532_ = (int) $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["route_id"];
                    $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_["links"]["route"] = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["route"];
                    $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_["links"]["route_id"] = $_obfuscated_0D16392D3E2F1231022234350C3F241F340313041F2532_;
                    if ($_obfuscated_0D16392D3E2F1231022234350C3F241F340313041F2532_ && ($_obfuscated_0D311904172E30371B1A5C1C030727073D122E16400501_ = $this->{$this->load_mod}->getManufacturer($_obfuscated_0D16392D3E2F1231022234350C3F241F340313041F2532_))) {
                        $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_["links"]["name_route"] = $_obfuscated_0D311904172E30371B1A5C1C030727073D122E16400501_;
                    } else {
                        $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_["links"]["name_route"] = "";
                    }
                } else {
                    if ($_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["route"] == "special") {
                        $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_["links"]["route"] = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["route"];
                        $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_["links"]["route_id"] = "";
                        $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_["links"]["name_route"] = "Special";
                    } else {
                        $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_["links"]["route"] = "";
                        $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_["links"]["route_id"] = "";
                        $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_["links"]["name_route"] = "";
                    }
                }
            }
            $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_["links"]["link"] = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["link"];
            $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_["links"]["short_link"] = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["short_link"];
            $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_["discrs"] = $this->{$this->load_mod}->getHandLinksDescriptions($id);
            $hand_links[$id] = $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_;
        }
        $_obfuscated_0D3B24052415043537303C05052A5B09252929321A3D22_ = array();
        $this->data["poles_hl"] = $_obfuscated_0D0F290D362B335B403D013C37382B09243136383B2C22_ = $this->{$this->load_mod}->polesHandLink();
        $this->data["poles_landing"] = $_obfuscated_0D3B24052415043537303C05052A5B09252929321A3D22_ = $this->{$this->load_mod}->polesLanding();
        $this->data["poles_landing_count"] = array();
        $this->data["poles_landing_count"]["c_l"] = $_obfuscated_0D08282B02242A111D5C30360E3937023614382A5B5C22_ = count($_obfuscated_0D3B24052415043537303C05052A5B09252929321A3D22_) + 1;
        foreach ($_obfuscated_0D0F290D362B335B403D013C37382B09243136383B2C22_ as $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_) {
            if (isset($this->data["legnd_hl_" . $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_])) {
                $this->data["poles_hl_name"]["legend"][$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_] = $this->data["legnd_hl_" . $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_];
            } else {
                $this->data["poles_hl_name"]["legend"][$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_] = $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_;
            }
            if (isset($this->data["help_hl_" . $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_])) {
                $this->data["poles_hl_name"]["help"][$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_] = $this->data["help_hl_" . $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_];
            } else {
                $this->data["poles_hl_name"]["help"][$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_] = $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_;
            }
        }
        $this->data[$shabl] = $hand_links;
        $_obfuscated_0D2E3C2F222D2224051232041E365B5B380C0923213011_ = $url . $_obfuscated_0D02401D282B0514292803160723022A271A013C171011_;
        $_obfuscated_0D0F38022A1906085B2C2C3C11170F190D2B1730101E11_ = new Pagination();
        $_obfuscated_0D0F38022A1906085B2C2C3C11170F190D2B1730101E11_->total = $_obfuscated_0D1D310E2236243D090F301C210A33152A170C19360C32_;
        $_obfuscated_0D0F38022A1906085B2C2C3C11170F190D2B1730101E11_->page = @$page;
        $_obfuscated_0D0F38022A1906085B2C2C3C11170F190D2B1730101E11_->limit = $_obfuscated_0D350D1535240730173F261C241D2B0A132E0305262932_;
        $_obfuscated_0D0F38022A1906085B2C2C3C11170F190D2B1730101E11_->url = $this->url->link($_obfuscated_0D09061002102C25143D13040B2B232B2B232B2B310301_, $this->token_token . $url . "&page={page}", $this->ssl);
        if ($this->what_versi < 2000) {
            $_obfuscated_0D0F38022A1906085B2C2C3C11170F190D2B1730101E11_->text = $this->language->get("text_pagination");
            $this->data["pagination"] = $_obfuscated_0D0F38022A1906085B2C2C3C11170F190D2B1730101E11_->render();
        } else {
            $this->data["pagination"] = $_obfuscated_0D0F38022A1906085B2C2C3C11170F190D2B1730101E11_->render();
            $this->data["results"] = sprintf($this->data["text_pagination"], $_obfuscated_0D1D310E2236243D090F301C210A33152A170C19360C32_ ? (@$page - 1) * $_obfuscated_0D350D1535240730173F261C241D2B0A132E0305262932_ + 1 : 0, $_obfuscated_0D1D310E2236243D090F301C210A33152A170C19360C32_ - $_obfuscated_0D350D1535240730173F261C241D2B0A132E0305262932_ < (@$page - 1) * $_obfuscated_0D350D1535240730173F261C241D2B0A132E0305262932_ ? $_obfuscated_0D1D310E2236243D090F301C210A33152A170C19360C32_ : (@$page - 1) * $_obfuscated_0D350D1535240730173F261C241D2B0A132E0305262932_ + $_obfuscated_0D350D1535240730173F261C241D2B0A132E0305262932_, $_obfuscated_0D1D310E2236243D090F301C210A33152A170C19360C32_, ceil($_obfuscated_0D1D310E2236243D090F301C210A33152A170C19360C32_ / $_obfuscated_0D350D1535240730173F261C241D2B0A132E0305262932_));
        }
        $this->data["tab_nav"] = $this->genTab();
        $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ = $this->name_mod . $this->set_4;
        $_obfuscated_0D09343D06053D25123011071139332B130F175C2F0A22_ = "";
        if (isset($_POST[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_])) {
            $_obfuscated_0D09343D06053D25123011071139332B130F175C2F0A22_ = $this->request->post[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_];
        } else {
            if ($this->config->get($_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_)) {
                $_obfuscated_0D09343D06053D25123011071139332B130F175C2F0A22_ = $this->config->get($_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_);
            }
        }
        $this->data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_] = $_obfuscated_0D09343D06053D25123011071139332B130F175C2F0A22_;
        $this->viewRed();
        $this->breadcrumbs($shabl, $_obfuscated_0D2E3C2F222D2224051232041E365B5B380C0923213011_);
        $this->getTpl($shabl);
    }
    private function copyTablHl()
    {
        $result = array();
        $_obfuscated_0D39031B1811130A5C2C0A0C3C1B19031017271B400301_ = array("link", "short_link", "route", "route_id");
        $_obfuscated_0D220721100A3D18101A3E1A28111325062C0C132A2532_ = array("title", "meta_descr", "keywords", "meta_h1", "discrib");
        $data = $this->{$this->load_mod}->getOldTablHL();
        foreach ($data as $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_) {
            $_obfuscated_0D292E5C3C1216140E3305132D2E162D232D06065C3E22_ = array();
            foreach ($_obfuscated_0D39031B1811130A5C2C0A0C3C1B19031017271B400301_ as $val) {
                if (isset($_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_[$val])) {
                    $_obfuscated_0D292E5C3C1216140E3305132D2E162D232D06065C3E22_["hand_links"][0][$val] = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_[$val];
                } else {
                    $_obfuscated_0D292E5C3C1216140E3305132D2E162D232D06065C3E22_["hand_links"][0][$val] = "";
                }
            }
            foreach ($_obfuscated_0D220721100A3D18101A3E1A28111325062C0C132A2532_ as $val) {
                if (isset($_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_[$val]) && ($_obfuscated_0D141331281B301B5C24010912241E2E230E042D0B2722_ = base64_decode($_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_[$val], true))) {
                    $_obfuscated_0D3C034030092B40333938340D19130F0C181C08150132_ = @unserialize($_obfuscated_0D141331281B301B5C24010912241E2E230E042D0B2722_);
                    if (is_array($_obfuscated_0D3C034030092B40333938340D19130F0C181C08150132_)) {
                        foreach ($_obfuscated_0D3C034030092B40333938340D19130F0C181C08150132_ as $_obfuscated_0D1D1D28301D02141E070B071C3E161A2A013F281E0D22_ => $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_) {
                            $_obfuscated_0D292E5C3C1216140E3305132D2E162D232D06065C3E22_["hand_links_lang"][0][$_obfuscated_0D1D1D28301D02141E070B071C3E161A2A013F281E0D22_][$val] = $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_;
                        }
                    }
                }
            }
            if ($_obfuscated_0D292E5C3C1216140E3305132D2E162D232D06065C3E22_ && ($_obfuscated_0D2E053E271822040F343C27102B0B19271612063D3932_ = $this->{$this->load_mod}->addHandLinksDiscript($_obfuscated_0D292E5C3C1216140E3305132D2E162D232D06065C3E22_, true, false))) {
                $result = $_obfuscated_0D2E053E271822040F343C27102B0B19271612063D3932_;
            }
        }
        if ($result) {
            $this->error["warning"] = "ERROR COPY TABLES!!! " . serialize($result);
        }
        return $result;
    }
    public function autocomplete()
    {
        $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_ = array();
        if (isset($this->request->get["filter_link"]) && $this->validate()) {
            if ($_obfuscated_0D11250A2712343B011522113B10362A5C09332B1E1E22_ = trim($this->request->get["filter_link"])) {
                $_obfuscated_0D290616245C2A08113B04305C0B3805210629360B1322_ = "LCASE(`link`) LIKE '%" . $this->db->escape($_obfuscated_0D11250A2712343B011522113B10362A5C09332B1E1E22_) . "%'";
                $results = $this->{$this->load_mod}->getHandLinks(array(), "", $_obfuscated_0D290616245C2A08113B04305C0B3805210629360B1322_);
                foreach ($results as $result) {
                    $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_[] = array("id" => $result["id"], "link" => $result["link"]);
                }
            }
        } else {
            if (isset($this->request->get["filter_short_link"]) && $this->validate()) {
                if ($_obfuscated_0D11250A2712343B011522113B10362A5C09332B1E1E22_ = trim($this->request->get["filter_short_link"])) {
                    $_obfuscated_0D290616245C2A08113B04305C0B3805210629360B1322_ = "LCASE(`short_link`) LIKE '%" . $this->db->escape($_obfuscated_0D11250A2712343B011522113B10362A5C09332B1E1E22_) . "%'";
                    $results = $this->{$this->load_mod}->getHandLinks(array(), "", $_obfuscated_0D290616245C2A08113B04305C0B3805210629360B1322_);
                    foreach ($results as $result) {
                        $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_[] = array("id" => $result["id"], "link" => $result["short_link"]);
                    }
                }
            } else {
                if (isset($this->request->get["route_select"]) && $this->validate()) {
                    if (isset($this->request->get["name_route"]) && ($_obfuscated_0D11250A2712343B011522113B10362A5C09332B1E1E22_ = trim($this->request->get["name_route"]))) {
                        $_obfuscated_0D32380B11250A3D0A391F2A19173F312E19365C060922_ = trim($this->request->get["route_select"]);
                        if ($_obfuscated_0D32380B11250A3D0A391F2A19173F312E19365C060922_ == "category_id") {
                            $results = $this->{$this->load_mod}->getCategorys($_obfuscated_0D11250A2712343B011522113B10362A5C09332B1E1E22_);
                            foreach ($results as $result) {
                                $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_[] = array("route_id" => $result["category_id"], "name" => strip_tags(html_entity_decode($result["name"], ENT_QUOTES, "UTF-8")));
                            }
                        } else {
                            if ($_obfuscated_0D32380B11250A3D0A391F2A19173F312E19365C060922_ == "manufacturer_id") {
                                $results = $this->{$this->load_mod}->getManufacturers($_obfuscated_0D11250A2712343B011522113B10362A5C09332B1E1E22_);
                                foreach ($results as $result) {
                                    $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_[] = array("route_id" => $result["manufacturer_id"], "name" => strip_tags(html_entity_decode($result["name"], ENT_QUOTES, "UTF-8")));
                                }
                            }
                        }
                    }
                } else {
                    if (isset($this->request->get["set_cats"]) && $this->validate()) {
                        if ($_obfuscated_0D11250A2712343B011522113B10362A5C09332B1E1E22_ = trim($this->request->get["set_cats"])) {
                            $results = $this->{$this->load_mod}->getCategorys($_obfuscated_0D11250A2712343B011522113B10362A5C09332B1E1E22_);
                            foreach ($results as $result) {
                                $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_[] = array("category_id" => $result["category_id"], "name" => strip_tags(html_entity_decode($result["name"], ENT_QUOTES, "UTF-8")));
                            }
                        }
                    } else {
                        if (isset($this->request->get["set_attrb"]) && $this->validate() && ($_obfuscated_0D11250A2712343B011522113B10362A5C09332B1E1E22_ = trim($this->request->get["set_attrb"]))) {
                            $results = $this->{$this->load_mod}->getAttrbGroup($_obfuscated_0D11250A2712343B011522113B10362A5C09332B1E1E22_);
                            foreach ($results as $result) {
                                $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_[] = array("attribute_id" => $result["attribute_id"], "name" => $result["name"], "attribute_group" => $result["attribute_group"]);
                            }
                        }
                    }
                }
            }
        }
        $this->response->addHeader("Content-Type: application/json");
        $this->response->setOutput(json_encode($_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_));
    }
    public function set_cats()
    {
        $this->data["shabl"] = $shabl = "set_cats";
        $this->data["bloc_bott_save"] = false;
        $this->data["action"] = $this->url->link($this->versi_put . "/" . $this->name_mod . "/" . $shabl, $this->token_token, $this->ssl);
        $this->data["cancel"] = $this->url->link($this->mod_ext, $this->token_token . $this->type_mod, $this->ssl);
        $this->data["tab_nav"] = $this->genTab();
        $this->data["set_cats"] = $this->set_cats_pole;
        if ($_obfuscated_0D292D1E023E22191F32383C333F5B5B102F2630161811_ = $this->config->get($this->name_mod . $this->set_5)) {
            foreach ($this->set_cats_pole as $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ => $_obfuscated_0D193619140B3101060B5C0113071E3912021905283C32_) {
                if ($_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ == "view_attrb") {
                    if (isset($_obfuscated_0D292D1E023E22191F32383C333F5B5B102F2630161811_[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_])) {
                        $view_attrb = array();
                        foreach ($_obfuscated_0D292D1E023E22191F32383C333F5B5B102F2630161811_[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_] as $_obfuscated_0D2824230D0605363B1C2A192C1003391E2301221A1801_ => $val) {
                            $_obfuscated_0D1B27013305120E0A123615281D3D2A27301115091322_ = array();
                            foreach ($val as $_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_) {
                                if ($_obfuscated_0D32293B0D0E0C405C0D07292E1D2C1F09260A11393332_ = $this->{$this->load_mod}->getAttrib($_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_)) {
                                    foreach ($_obfuscated_0D32293B0D0E0C405C0D07292E1D2C1F09260A11393332_ as $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_) {
                                        $_obfuscated_0D1B27013305120E0A123615281D3D2A27301115091322_[$_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["attribute_id"]] = array("name" => $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["name"], "attribute_id" => $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["attribute_id"]);
                                    }
                                }
                            }
                            if ($_obfuscated_0D1B27013305120E0A123615281D3D2A27301115091322_) {
                                $_obfuscated_0D160F2A0E1804181C252B2E1F3034241E0D5B0B3B3111_ = array();
                                foreach ($_obfuscated_0D1B27013305120E0A123615281D3D2A27301115091322_ as $key => $value) {
                                    $_obfuscated_0D160F2A0E1804181C252B2E1F3034241E0D5B0B3B3111_[$key] = mb_strtolower($value["name"], "UTF-8");
                                }
                                array_multisort($_obfuscated_0D160F2A0E1804181C252B2E1F3034241E0D5B0B3B3111_, SORT_ASC, $_obfuscated_0D1B27013305120E0A123615281D3D2A27301115091322_);
                            }
                            $_obfuscated_0D211F330D15220F043E30132E311E332A391A31193C32_ = $this->{$this->load_mod}->getCategory($_obfuscated_0D2824230D0605363B1C2A192C1003391E2301221A1801_);
                            foreach ($_obfuscated_0D211F330D15220F043E30132E311E332A391A31193C32_ as $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_) {
                                $view_attrb[$_obfuscated_0D2824230D0605363B1C2A192C1003391E2301221A1801_] = array("name" => strip_tags(html_entity_decode($_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["name"], ENT_QUOTES, "UTF-8")), "category_id" => $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["category_id"], "attrb" => $_obfuscated_0D1B27013305120E0A123615281D3D2A27301115091322_);
                            }
                        }
                        if ($view_attrb) {
                            $_obfuscated_0D160F2A0E1804181C252B2E1F3034241E0D5B0B3B3111_ = array();
                            foreach ($view_attrb as $key => $value) {
                                $_obfuscated_0D160F2A0E1804181C252B2E1F3034241E0D5B0B3B3111_[$key] = mb_strtolower($value["name"], "UTF-8");
                            }
                            array_multisort($_obfuscated_0D160F2A0E1804181C252B2E1F3034241E0D5B0B3B3111_, SORT_ASC, $view_attrb);
                        }
                        $this->data["set_cats"][$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_] = $view_attrb;
                    }
                } else {
                    if (isset($_obfuscated_0D292D1E023E22191F32383C333F5B5B102F2630161811_[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_])) {
                        $this->data["set_cats"][$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_] = $_obfuscated_0D292D1E023E22191F32383C333F5B5B102F2630161811_[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_];
                    }
                }
            }
        }
        $this->breadcrumbs($shabl);
        $this->getTpl($shabl);
    }
    private function saveSetCats($arr_post)
    {
        $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_ = array();
        foreach ($this->set_cats_pole as $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ => $_obfuscated_0D193619140B3101060B5C0113071E3912021905283C32_) {
            if ($_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ == "view_attrb") {
                if (isset($arr_post[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_])) {
                    $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_ = array();
                    foreach ($arr_post[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_] as $_obfuscated_0D36312318113D5C3C3F1A3C0A04043317133622175B11_) {
                        if (isset($_obfuscated_0D36312318113D5C3C3F1A3C0A04043317133622175B11_["category_id"])) {
                            if (isset($_obfuscated_0D36312318113D5C3C3F1A3C0A04043317133622175B11_["attrb"])) {
                                sort($_obfuscated_0D36312318113D5C3C3F1A3C0A04043317133622175B11_["attrb"]);
                                $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_[$_obfuscated_0D36312318113D5C3C3F1A3C0A04043317133622175B11_["category_id"]] = $_obfuscated_0D36312318113D5C3C3F1A3C0A04043317133622175B11_["attrb"];
                            } else {
                                $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_[$_obfuscated_0D36312318113D5C3C3F1A3C0A04043317133622175B11_["category_id"]] = array();
                            }
                        }
                    }
                    if ($_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_) {
                        $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_] = $_obfuscated_0D221A230931013921372B3D40120C5B103E3732370F32_;
                    }
                }
            } else {
                if (isset($arr_post[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_])) {
                    $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_] = $arr_post[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_];
                }
            }
        }
        return $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_;
    }
    private function pregStrAll($str)
    {
        $n = PHP_EOL;
        $shabl = "/\\<i.+?i\\>/";
        preg_match_all($shabl, $str, $_obfuscated_0D0840332D5B2F2D19160C230E16140807122F2D382311_);
        $_obfuscated_0D25340C1129401F380E192140153926341C0623032C11_ = array();
        foreach ($_obfuscated_0D0840332D5B2F2D19160C230E16140807122F2D382311_[0] as $_obfuscated_0D3733063E251E3E290C240437060D1B30183C1E173F11_) {
            $_obfuscated_0D25340C1129401F380E192140153926341C0623032C11_[] = "<span class=\"vibor_icon\">" . $_obfuscated_0D3733063E251E3E290C240437060D1B30183C1E173F11_ . "</span>";
        }
        return implode($n, $_obfuscated_0D25340C1129401F380E192140153926341C0623032C11_) . $n;
    }
    public function style_filter()
    {
        $this->data["shabl"] = $shabl = "style_filter";
        $this->data["bloc_bott_save"] = false;
        $this->data["action"] = $this->url->link($this->versi_put . "/" . $this->name_mod . "/" . $shabl, $this->token_token, $this->ssl);
        $this->data["cancel"] = $this->url->link($this->mod_ext, $this->token_token . $this->type_mod, $this->ssl);
        $_obfuscated_0D01111F2C32293F2B260D3E2C3F362730121A2A3B3911_ = $this->data["cancel"];
        $this->document->addStyle("view/javascript/fv/minicolors/jquery.minicolors.css");
        $this->document->addScript("view/javascript/fv/minicolors/jquery.minicolors.min.js");
        $this->document->addStyle("../catalog/view/theme/default/stylesheet/filter_vier/other/ion.rangeslider.css");
        $this->document->addStyle("../catalog/view/theme/default/stylesheet/filter_vier/other/skin_slider.css");
        $this->document->addScript("../catalog/view/javascript/ui/ion.rangeslider.min.js");
        $this->data["tab_nav"] = $this->genTab();
        $_obfuscated_0D15303F311B1A1F0313195B0B28233305230D22122722_ = array("filter_vier_css");
        $this->setSet($_obfuscated_0D15303F311B1A1F0313195B0B28233305230D22122722_);
        $_obfuscated_0D0708101037330D1C1935362A062E2633072A3B212E32_ = array("main_set", "mobil_versi", "button", "select_checks", "skin_slider", "ajax_bloc");
        $this->data["tab_nav_panel"] = $this->genTab($_obfuscated_0D0708101037330D1C1935362A062E2633072A3B212E32_, "legnd_");
        $_obfuscated_0D2A401926240E193C033230213E0E0E010F3B342D1A32_ = array("default", "hover", "active");
        $this->data["tab_nav_vide"] = $this->genTab($_obfuscated_0D2A401926240E193C033230213E0E0E010F3B342D1A32_, "legnd_css_");
        $_obfuscated_0D3B5C2E2D39082E15130810122832370E0221243C2E01_ = array("background-color", "border-color", "color");
        $_obfuscated_0D161E5C0E07353D291405130B393E18290C1C2C342A11_ = array();
        $_obfuscated_0D3B303D282F141E06021B123B0D24121C172C110F1901_ = array();
        $_obfuscated_0D5C2133010B390424292835190F320E09333D14340822_ = array("border-width", "border-radius", "top");
        $_obfuscated_0D0A4013341F121935110A1E0F29352A2C132C40361832_ = array();
        $_obfuscated_0D1D2B172F245B1E3D2E1C111B0A311B3629353D0B1201_ = array();
        foreach (array("button", "select_checks") as $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_) {
            foreach ($_obfuscated_0D2A401926240E193C033230213E0E0E010F3B342D1A32_ as $k => $_obfuscated_0D180A262A1407253E1119333414360C0B261129322201_) {
                if ($k === 0) {
                    $vid = "";
                } else {
                    $vid = "_" . $_obfuscated_0D180A262A1407253E1119333414360C0B261129322201_;
                }
                foreach ($_obfuscated_0D3B5C2E2D39082E15130810122832370E0221243C2E01_ as $_obfuscated_0D2B0B34263D1E3825270C181824261B303423261C1C32_) {
                    if ($_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ == "select_checks" && $_obfuscated_0D2B0B34263D1E3825270C181824261B303423261C1C32_ == "color" && ($_obfuscated_0D180A262A1407253E1119333414360C0B261129322201_ == "default" || $_obfuscated_0D180A262A1407253E1119333414360C0B261129322201_ == "hover")) {
                        continue;
                    }
                    $_obfuscated_0D3B232436051B3E3C0630182A2E0C2C0B053129271111_ = str_replace("-", "_", $_obfuscated_0D2B0B34263D1E3825270C181824261B303423261C1C32_);
                    $_obfuscated_0D161E5C0E07353D291405130B393E18290C1C2C342A11_[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_][$_obfuscated_0D180A262A1407253E1119333414360C0B261129322201_][$_obfuscated_0D3B232436051B3E3C0630182A2E0C2C0B053129271111_ . $vid] = $_obfuscated_0D3B232436051B3E3C0630182A2E0C2C0B053129271111_;
                    $_obfuscated_0D3B303D282F141E06021B123B0D24121C172C110F1901_[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_][$_obfuscated_0D180A262A1407253E1119333414360C0B261129322201_][$_obfuscated_0D3B232436051B3E3C0630182A2E0C2C0B053129271111_ . $vid] = $_obfuscated_0D2B0B34263D1E3825270C181824261B303423261C1C32_;
                }
                foreach ($_obfuscated_0D5C2133010B390424292835190F320E09333D14340822_ as $_obfuscated_0D23103D305C260B0E38240F3726251310163417353432_) {
                    if ($_obfuscated_0D23103D305C260B0E38240F3726251310163417353432_ == "top" && ($_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ == "button" || $_obfuscated_0D180A262A1407253E1119333414360C0B261129322201_ == "default" || $_obfuscated_0D180A262A1407253E1119333414360C0B261129322201_ == "hover")) {
                        continue;
                    }
                    $_obfuscated_0D011E3E2A325B13021A06040E290B240F3207302E1511_ = str_replace("-", "_", $_obfuscated_0D23103D305C260B0E38240F3726251310163417353432_);
                    $_obfuscated_0D0A4013341F121935110A1E0F29352A2C132C40361832_[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_][$_obfuscated_0D180A262A1407253E1119333414360C0B261129322201_][$_obfuscated_0D011E3E2A325B13021A06040E290B240F3207302E1511_ . $vid] = $_obfuscated_0D011E3E2A325B13021A06040E290B240F3207302E1511_;
                    $_obfuscated_0D1D2B172F245B1E3D2E1C111B0A311B3629353D0B1201_[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_][$_obfuscated_0D180A262A1407253E1119333414360C0B261129322201_][$_obfuscated_0D011E3E2A325B13021A06040E290B240F3207302E1511_ . $vid] = $_obfuscated_0D23103D305C260B0E38240F3726251310163417353432_;
                }
            }
        }
        $this->data["arr_colors"] = $_obfuscated_0D161E5C0E07353D291405130B393E18290C1C2C342A11_;
        $this->data["arr_colors_repl"] = $_obfuscated_0D3B303D282F141E06021B123B0D24121C172C110F1901_;
        $this->data["arr_lines"] = $_obfuscated_0D0A4013341F121935110A1E0F29352A2C132C40361832_;
        $this->data["arr_lines_repl"] = $_obfuscated_0D1D2B172F245B1E3D2E1C111B0A311B3629353D0B1201_;
        $this->data["arr_border_radius"] = array("border_top_left_radius", "border_top_right_radius", "border_bottom_left_radius", "border_bottom_right_radius");
        $this->data["total_position"] = array(1, 2, 3);
        $this->data["block_param_count"] = array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        $this->data["min_width_gorizont"] = $this->min_width_gorizont;
        $this->data["width_mobil"] = $this->width_mobil;
        $this->data["display_yes_no"] = array("block" => $this->data["text_yes"], "none" => $this->data["text_no"]);
        $this->data["display_no_yes"] = array("none" => $this->data["text_no"], "block" => $this->data["text_yes"]);
        $this->data["arr_text_alignf"] = array("" => $this->data["text_full_width"], "left" => $this->data["text_left"], "right" => $this->data["text_right"]);
        $this->data["arr_text_alignc"] = array("center" => $this->data["text_center"], "left" => $this->data["text_left"], "right" => $this->data["text_right"]);
        $this->data["choice_theme"] = $this->scanDirFile($this->dir_style);
        $this->data["choice_mobil_versi"] = array_merge(array("--"), $this->scanDirFile($this->put_mobil_version));
        $this->data["choice_button"] = $this->scanDirFile($this->dir_style . "button/");
        $this->data["choice_select_checks"] = $this->scanDirFile($this->dir_style . "select_checks/");
        $this->data["choice_skin_slider"] = array_merge(array("--"), $this->scanDirFile($this->dir_style . "skin_slider/"));
        $this->data["arr_blok_sl"] = array("bar" => array("blok_color" => array("background" => ""), "blok_number" => array("height" => "5", "top" => "33")), "line" => array("blok_color" => array("background" => "", "border_color" => ""), "blok_number" => array("border_width" => "0", "border_radius" => "0", "height" => "5", "top" => "33")), "slider" => array("blok_color" => array("background" => "", "border_color" => ""), "blok_number" => array("border_width" => "0", "border_radius" => "3", "width" => "12", "height" => "17", "top" => "28")), "single" => array("blok_color" => array("background" => "", "color" => ""), "blok_number" => array("border_radius" => "3", "top" => "0")));
        $this->data["arr_sl_grid"] = array("grid_pol" => array("blok_color" => array("background" => "#666666")), "grid_text" => array("blok_color" => array("color" => "#666666")), "grid" => array("blok_number" => array("bottom" => "0")));
        $this->data["arr_blok"] = array("head_filter" => array("font_weight" => "blok_number", "color" => "blok_color", "text_align" => "blok_select", "background_color" => "blok_color", "border_width" => "blok_number", "border_color" => "blok_color"), "filter_vier" => array("background_color" => "blok_color", "padding" => "blok_number", "border_width" => "blok_number", "border_color" => "blok_color"), "head_group" => array("font_weight" => "blok_number", "color" => "blok_color"), "title_filter" => array("font_weight" => "blok_number", "color" => "blok_color", "background_color" => "blok_color"), "block_param" => array("background_color" => "blok_color", "color_a" => "blok_color", "color" => "blok_color", "border_width" => "blok_number", "border_color" => "blok_color"), "ligend_get" => array("font_weight" => "blok_number", "color" => "blok_color"), "count_prod" => array("color" => "blok_color", "background_color" => "blok_color", "border_width" => "blok_number", "border_color" => "blok_color", "border_radius" => "blok_number", "top" => "blok_number"));
        $this->data["ajax_bloks"] = array("bloc_aj_all" => array("background_color" => "blok_color", "color" => "blok_color", "font_weight" => "blok_number", "border_width" => "blok_number", "border_color" => "blok_color", "border_radius" => "blok_number", "padding" => "blok_number"), "aj_bloc_txt" => array("background_color" => "blok_color", "color" => "blok_color", "font_weight" => "blok_number", "border_width" => "blok_number", "border_color" => "blok_color", "border_radius" => "blok_number", "padding" => "blok_number"), "ajx_total_prod" => array("background_color" => "blok_color", "color" => "blok_color", "font_weight" => "blok_number", "border_width" => "blok_number", "border_color" => "blok_color", "border_radius" => "blok_number", "padding" => "blok_number"), "aj_bloc_btn" => array("background_color" => "blok_color", "color" => "blok_color", "font_weight" => "blok_number", "border_width" => "blok_number", "border_color" => "blok_color", "border_radius" => "blok_number", "padding" => "blok_number"), "aj_blc_del" => array("background_color" => "blok_color", "color" => "blok_color", "font_weight" => "blok_number", "border_width" => "blok_number", "border_color" => "blok_color", "border_radius" => "blok_number", "padding" => "blok_number"));
        $_obfuscated_0D1D1D28301D02141E070B071C3E161A2A013F281E0D22_ = (int) $this->config->get("config_language_id");
        $_obfuscated_0D1B24061F1C3E3C353D1A22312208061D1F1613361601_ = $this->{$this->load_mod}->getDiscriptions();
        $_obfuscated_0D165C011A3708190B1F01292722251B051F5C17051A32_ = "";
        $_obfuscated_0D3003170D3424072C173B220D223B23212C2E121D1301_ = "";
        if (isset($_obfuscated_0D1B24061F1C3E3C353D1A22312208061D1F1613361601_["lang"][$_obfuscated_0D1D1D28301D02141E070B071C3E161A2A013F281E0D22_]["legend_aj_bloc_txt"])) {
            $_obfuscated_0D165C011A3708190B1F01292722251B051F5C17051A32_ = $_obfuscated_0D1B24061F1C3E3C353D1A22312208061D1F1613361601_["lang"][$_obfuscated_0D1D1D28301D02141E070B071C3E161A2A013F281E0D22_]["legend_aj_bloc_txt"];
        }
        if (isset($_obfuscated_0D1B24061F1C3E3C353D1A22312208061D1F1613361601_["lang"][$_obfuscated_0D1D1D28301D02141E070B071C3E161A2A013F281E0D22_]["legend_aj_bloc_btn"])) {
            $_obfuscated_0D3003170D3424072C173B220D223B23212C2E121D1301_ = $_obfuscated_0D1B24061F1C3E3C353D1A22312208061D1F1613361601_["lang"][$_obfuscated_0D1D1D28301D02141E070B071C3E161A2A013F281E0D22_]["legend_aj_bloc_btn"];
        }
        $this->data["no_ajax_text"] = $_obfuscated_0D165C011A3708190B1F01292722251B051F5C17051A32_ || $_obfuscated_0D3003170D3424072C173B220D223B23212C2E121D1301_ ? false : true;
        $this->data["primer_text"] = array("aj_bloc_txt" => $_obfuscated_0D165C011A3708190B1F01292722251B051F5C17051A32_, "aj_bloc_btn" => $_obfuscated_0D3003170D3424072C173B220D223B23212C2E121D1301_);
        $this->data["arr_icons"] = array("icon_visi", "icon_hidi");
        $this->data["mmsva"] = array("border_width" => array("min" => 0, "max" => 20, "step" => 1, "value" => ""), "border_radius" => array("min" => 0, "max" => 40, "step" => 1, "value" => ""), "width" => array("min" => 0, "max" => 500, "step" => 1, "value" => 0), "height" => array("min" => 0, "max" => 500, "step" => 1, "value" => 0), "padding" => array("min" => 0, "max" => 40, "step" => 1, "value" => ""), "width_percent" => array("min" => 0, "max" => 100, "step" => 0.1, "value" => ""), "top" => array("min" => -50, "max" => 50, "step" => 1, "value" => ""), "bottom" => array("min" => -50, "max" => 50, "step" => 1, "value" => ""), "font_weight" => array("min" => 100, "max" => 900, "step" => 100, "value" => 400), "z_index" => array("min" => 0, "max" => 1000, "step" => 1, "value" => ""), "corect_gorizont" => array("min" => -200, "max" => 300, "step" => 1, "value" => ""), "corect_vertical" => array("min" => -200, "max" => 300, "step" => 1, "value" => ""));
        $this->data["mmsv"] = array("border_width" => array("min" => 0, "max" => 20, "step" => 1, "value" => ""), "border_radius" => array("min" => 0, "max" => 40, "step" => 1, "value" => ""), "width" => array("min" => 0, "max" => 100, "step" => 1, "value" => 0), "height" => array("min" => 0, "max" => 100, "step" => 1, "value" => 0), "padding" => array("min" => 0, "max" => 40, "step" => 1, "value" => ""), "width_percent" => array("min" => 0, "max" => 100, "step" => 0.1, "value" => ""), "top" => array("min" => -50, "max" => 50, "step" => 1, "value" => ""), "bottom" => array("min" => -50, "max" => 50, "step" => 1, "value" => ""), "font_weight" => array("min" => 100, "max" => 900, "step" => 100, "value" => 400), "z_index" => array("min" => 0, "max" => 1000, "step" => 1, "value" => ""));
        $this->breadcrumbs($shabl);
        $this->getTpl($shabl);
    }
    private function getIconAwesome($text = "")
    {
        $str = $this->cssRead($this->dir_style . "html/icon_awesome.html");
        return "<div id=\"id_input_icon\" style=\"display:none;\">" . $text . "</div>" . $str;
    }
    private function saveStyle($data)
    {
        $result = "";
        $error = "";
        $_obfuscated_0D1D290130181031331A07143B213E192337062D272D11_ = "*";
        $_obfuscated_0D1D3F11075C2B12132A253229221B250A380A18372401_ = "/";
        $_obfuscated_0D112F3C043F17153C1A3F311F232B0A0A18063E0E3C11_ = " ";
        $n = PHP_EOL;
        $_obfuscated_0D2E26150F1D0B25093639041505245C081501221F2601_ = "";
        $theme = $this->tema_default;
        if (isset($data["themes"])) {
            $theme = $data["themes"];
        }
        $_obfuscated_0D2E26150F1D0B25093639041505245C081501221F2601_ .= $this->cssRead($this->dir_style . $theme . ".css") . $n;
        $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ = "button";
        if (isset($data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_])) {
            if (isset($data["status"][$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_])) {
                $_obfuscated_0D0C2B3939043E32155B06092D33310A39221218083132_ = ".btn_fv";
                $_obfuscated_0D360C2B032F5B3D10265B0F092D5C2818273324360722_ = ".btn_fv:hover:not(.css_disabled):not(.count_0)";
                $_obfuscated_0D21321C37245C3E2A16023F39321040030C5B1F372622_ = ".btn_fv.actionis";
                if (isset($data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_]["choice"])) {
                    unset($data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_]["choice"]);
                }
                $_obfuscated_0D2E26150F1D0B25093639041505245C081501221F2601_ .= $this->recStylePole($data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_], $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_, $_obfuscated_0D0C2B3939043E32155B06092D33310A39221218083132_, $_obfuscated_0D360C2B032F5B3D10265B0F092D5C2818273324360722_, $_obfuscated_0D21321C37245C3E2A16023F39321040030C5B1F372622_) . $n;
            } else {
                if (isset($data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_]["choice"])) {
                    $_obfuscated_0D211A223D330A0C3E0116194039050216150A5B105C11_ = (string) $data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_]["choice"];
                    $_obfuscated_0D2E26150F1D0B25093639041505245C081501221F2601_ .= $this->cssRead($this->dir_style . $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ . "/" . $_obfuscated_0D211A223D330A0C3E0116194039050216150A5B105C11_ . ".css") . $n;
                }
            }
        }
        $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ = "select_checks";
        if (isset($data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_])) {
            if (isset($data["status"][$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_])) {
                $_obfuscated_0D0C2B3939043E32155B06092D33310A39221218083132_ = ".checka:before";
                $_obfuscated_0D360C2B032F5B3D10265B0F092D5C2818273324360722_ = ".checkb:hover:not(.curs_def):before";
                $_obfuscated_0D21321C37245C3E2A16023F39321040030C5B1F372622_ = ".checka.actionis:before";
                $_obfuscated_0D13101D0B28330A05340F2E0A2E19190F36110F3D3501_ = "";
                $_obfuscated_0D3D0805270F1C2F04282C2538163C0B332940100B2232_ = "";
                if (isset($data["checks_galka"])) {
                    $_obfuscated_0D13101D0B28330A05340F2E0A2E19190F36110F3D3501_ = ".checka.actionis:after";
                    $_obfuscated_0D3D0805270F1C2F04282C2538163C0B332940100B2232_ = "_galka";
                }
                if (isset($data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_]["choice"])) {
                    unset($data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_]["choice"]);
                }
                $_obfuscated_0D2E26150F1D0B25093639041505245C081501221F2601_ .= $this->recStylePole($data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_], $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_, $_obfuscated_0D0C2B3939043E32155B06092D33310A39221218083132_, $_obfuscated_0D360C2B032F5B3D10265B0F092D5C2818273324360722_, $_obfuscated_0D21321C37245C3E2A16023F39321040030C5B1F372622_, $_obfuscated_0D13101D0B28330A05340F2E0A2E19190F36110F3D3501_, $_obfuscated_0D3D0805270F1C2F04282C2538163C0B332940100B2232_) . $n;
            } else {
                if (isset($data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_]["choice"])) {
                    $_obfuscated_0D211A223D330A0C3E0116194039050216150A5B105C11_ = (string) $data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_]["choice"];
                    $_obfuscated_0D2E26150F1D0B25093639041505245C081501221F2601_ .= $this->cssRead($this->dir_style . $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ . "/" . $_obfuscated_0D211A223D330A0C3E0116194039050216150A5B105C11_ . ".css") . $n;
                }
            }
        }
        $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ = "skin_slider";
        if (isset($data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_])) {
            if (isset($data["status"][$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_])) {
                if (isset($data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_]["choice"])) {
                    unset($data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_]["choice"]);
                }
                $_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_ = array();
                $_obfuscated_0D262C0118361328163819111316311D1E1A2E301F0B01_ = "irs-";
                foreach ($data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_] as $_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_ => $_obfuscated_0D171F10103F010730381C0701342916150B270F391001_) {
                    $_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_ = "." . $_obfuscated_0D262C0118361328163819111316311D1E1A2E301F0B01_ . str_replace("_", "-", $_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_);
                    if ($_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_ == "single") {
                        $_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_ .= ",.irs-from,.irs-to";
                    }
                    if (is_array($_obfuscated_0D171F10103F010730381C0701342916150B270F391001_)) {
                        foreach ($_obfuscated_0D171F10103F010730381C0701342916150B270F391001_ as $key => $val) {
                            if (strlen($val) < 1) {
                                continue;
                            }
                            if (strpos($key, "width") !== false || strpos($key, "height") !== false || strpos($key, "radius") !== false || strpos($key, "top") !== false || $key == "bottom" || strpos($key, "padding") !== false) {
                                $val = (int) $val . "px";
                            }
                            $key = str_replace("_", "-", $key);
                            $_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_[$_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_][] = $this->videStyle($key, $val);
                        }
                    } else {
                        if (is_string($_obfuscated_0D171F10103F010730381C0701342916150B270F391001_) && $_obfuscated_0D171F10103F010730381C0701342916150B270F391001_) {
                            $_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_[$_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_][] = $_obfuscated_0D171F10103F010730381C0701342916150B270F391001_;
                        }
                    }
                }
                if ($_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_) {
                    $_obfuscated_0D2E26150F1D0B25093639041505245C081501221F2601_ .= $_obfuscated_0D1D3F11075C2B12132A253229221B250A380A18372401_ . $_obfuscated_0D1D290130181031331A07143B213E192337062D272D11_ . $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ . $_obfuscated_0D1D290130181031331A07143B213E192337062D272D11_ . $_obfuscated_0D1D3F11075C2B12132A253229221B250A380A18372401_ . $n;
                    foreach ($_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_ as $_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_ => $_obfuscated_0D020801331B1E161F08042D34111A0F1A3F3C33092101_) {
                        if ($_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_ == "add_style") {
                            $_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_ = "";
                        }
                        if ($_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_) {
                            $_obfuscated_0D2E26150F1D0B25093639041505245C081501221F2601_ .= $_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_ . "{" . implode(" ", $_obfuscated_0D020801331B1E161F08042D34111A0F1A3F3C33092101_) . "}" . $n;
                        } else {
                            $_obfuscated_0D2E26150F1D0B25093639041505245C081501221F2601_ .= implode(" ", $_obfuscated_0D020801331B1E161F08042D34111A0F1A3F3C33092101_) . $n;
                        }
                    }
                    $_obfuscated_0D2E26150F1D0B25093639041505245C081501221F2601_ .= $this->cssRead($this->dir_style . "other/" . $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ . ".css") . $n;
                    $_obfuscated_0D2E26150F1D0B25093639041505245C081501221F2601_ .= $_obfuscated_0D1D3F11075C2B12132A253229221B250A380A18372401_ . $_obfuscated_0D1D290130181031331A07143B213E192337062D272D11_ . "end " . $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ . $_obfuscated_0D1D290130181031331A07143B213E192337062D272D11_ . $_obfuscated_0D1D3F11075C2B12132A253229221B250A380A18372401_ . $n;
                }
            } else {
                if (isset($data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_]["choice"]) && $data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_]["choice"] != "--") {
                    $_obfuscated_0D211A223D330A0C3E0116194039050216150A5B105C11_ = (string) $data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_]["choice"];
                    $_obfuscated_0D2E26150F1D0B25093639041505245C081501221F2601_ .= $this->cssRead($this->dir_style . $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ . "/" . $_obfuscated_0D211A223D330A0C3E0116194039050216150A5B105C11_ . ".css") . $n;
                }
            }
        }
        $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ = "ajax_bloc";
        if (isset($data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_]) && isset($data["status"][$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_])) {
            $_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_ = array();
            foreach ($data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_] as $_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_ => $_obfuscated_0D171F10103F010730381C0701342916150B270F391001_) {
                if ($_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_ == "no_style") {
                    continue;
                }
                if ($_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_ == "bloc_primenit") {
                    $_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_ = "#" . $_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_;
                } else {
                    $_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_ = "." . $_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_;
                }
                if (is_array($_obfuscated_0D171F10103F010730381C0701342916150B270F391001_)) {
                    foreach ($_obfuscated_0D171F10103F010730381C0701342916150B270F391001_ as $key => $val) {
                        if (strlen($val) < 1) {
                            continue;
                        }
                        if (strpos($key, "width") !== false || strpos($key, "height") !== false || strpos($key, "radius") !== false || strpos($key, "top") !== false || $key == "bottom" || strpos($key, "padding") !== false) {
                            $val = (int) $val . "px";
                        }
                        $key = str_replace("_", "-", $key);
                        if (strpos($key, "align") !== false) {
                            $_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_[".bloc_aj_all"][] = $this->videStyle("display", "inline-block");
                        }
                        $_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_[$_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_][] = $this->videStyle($key, $val);
                    }
                } else {
                    if (is_string($_obfuscated_0D171F10103F010730381C0701342916150B270F391001_) && $_obfuscated_0D171F10103F010730381C0701342916150B270F391001_) {
                        $_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_[$_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_][] = $_obfuscated_0D171F10103F010730381C0701342916150B270F391001_;
                    }
                }
            }
            if ($_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_) {
                $_obfuscated_0D2E26150F1D0B25093639041505245C081501221F2601_ .= $_obfuscated_0D1D3F11075C2B12132A253229221B250A380A18372401_ . $_obfuscated_0D1D290130181031331A07143B213E192337062D272D11_ . $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ . $_obfuscated_0D1D290130181031331A07143B213E192337062D272D11_ . $_obfuscated_0D1D3F11075C2B12132A253229221B250A380A18372401_ . $n;
                foreach ($_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_ as $_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_ => $_obfuscated_0D020801331B1E161F08042D34111A0F1A3F3C33092101_) {
                    if ($_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_ == "add_style") {
                        $_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_ = "";
                    }
                    if ($_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_) {
                        $_obfuscated_0D2E26150F1D0B25093639041505245C081501221F2601_ .= $_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_ . "{" . implode(" ", $_obfuscated_0D020801331B1E161F08042D34111A0F1A3F3C33092101_) . "}" . $n;
                    } else {
                        $_obfuscated_0D2E26150F1D0B25093639041505245C081501221F2601_ .= implode(" ", $_obfuscated_0D020801331B1E161F08042D34111A0F1A3F3C33092101_) . $n;
                    }
                }
                $_obfuscated_0D2E26150F1D0B25093639041505245C081501221F2601_ .= $_obfuscated_0D1D3F11075C2B12132A253229221B250A380A18372401_ . $_obfuscated_0D1D290130181031331A07143B213E192337062D272D11_ . "end " . $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ . $_obfuscated_0D1D290130181031331A07143B213E192337062D272D11_ . $_obfuscated_0D1D3F11075C2B12132A253229221B250A380A18372401_ . $n;
            }
        }
        $width_mobil = $this->width_mobil;
        $_obfuscated_0D2A09240410400A125B2F35310336042C063128392832_ = "@media(min-width:" . $width_mobil . "px)";
        $_obfuscated_0D055C152F115B0A01181C102B103B252C17401D140911_ = "@media(max-width:" . $width_mobil . "px)";
        $_obfuscated_0D1E023F2E1B0634020B402B3B0919160519335B3C2401_ = "";
        $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ = "mobil_versi";
        if (isset($data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_])) {
            $_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_ = array();
            foreach ($data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_] as $_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_ => $_obfuscated_0D171F10103F010730381C0701342916150B270F391001_) {
                if ($_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_ == "mobil_versi") {
                    $_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_ = "add_style";
                    if (is_string($_obfuscated_0D171F10103F010730381C0701342916150B270F391001_) && $_obfuscated_0D171F10103F010730381C0701342916150B270F391001_ != "--") {
                        $_obfuscated_0D171F10103F010730381C0701342916150B270F391001_ = $this->cssRead($this->put_mobil_version . $_obfuscated_0D171F10103F010730381C0701342916150B270F391001_ . ".css");
                    } else {
                        $_obfuscated_0D171F10103F010730381C0701342916150B270F391001_ = NULL;
                    }
                } else {
                    if ($_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_ == "add_style") {
                        $_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_ = $_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_;
                        $_obfuscated_0D171F10103F010730381C0701342916150B270F391001_ = $this->enDecode(trim($_obfuscated_0D171F10103F010730381C0701342916150B270F391001_));
                    } else {
                        if ($_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_ == "head_filter" || $_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_ == "filter_vier" || $_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_ == "name_filter") {
                            $_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_ = "#" . $_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_;
                        } else {
                            if ($_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_ == "width_mobil") {
                                if (is_numeric($_obfuscated_0D171F10103F010730381C0701342916150B270F391001_) && ($_obfuscated_0D0E170807191C0E04151C2F5B0D15382D04350C031322_ = (int) $_obfuscated_0D171F10103F010730381C0701342916150B270F391001_) && 0 < $_obfuscated_0D0E170807191C0E04151C2F5B0D15382D04350C031322_) {
                                    $this->width_mobil = $_obfuscated_0D0E170807191C0E04151C2F5B0D15382D04350C031322_;
                                }
                                $_obfuscated_0D171F10103F010730381C0701342916150B270F391001_ = NULL;
                            } else {
                                $_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_ = "." . $_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_;
                            }
                        }
                    }
                }
                if (is_array($_obfuscated_0D171F10103F010730381C0701342916150B270F391001_)) {
                    foreach ($_obfuscated_0D171F10103F010730381C0701342916150B270F391001_ as $key => $val) {
                        if (strlen($val) < 1) {
                            continue;
                        }
                        $key = str_replace("_", "-", $key);
                        $_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_[$_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_][] = $this->videStyle($key, $val);
                    }
                } else {
                    if (is_string($_obfuscated_0D171F10103F010730381C0701342916150B270F391001_) && $_obfuscated_0D171F10103F010730381C0701342916150B270F391001_) {
                        $_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_[$_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_][] = $_obfuscated_0D171F10103F010730381C0701342916150B270F391001_;
                    }
                }
            }
            if ($_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_) {
                foreach ($_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_ as $_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_ => $_obfuscated_0D020801331B1E161F08042D34111A0F1A3F3C33092101_) {
                    if ($_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_ == "add_style") {
                        $_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_ = "";
                    }
                    if ($_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_) {
                        $_obfuscated_0D1E023F2E1B0634020B402B3B0919160519335B3C2401_ .= $_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_ . "{" . implode(" ", $_obfuscated_0D020801331B1E161F08042D34111A0F1A3F3C33092101_) . "}" . $n;
                    } else {
                        $_obfuscated_0D1E023F2E1B0634020B402B3B0919160519335B3C2401_ .= implode(" ", $_obfuscated_0D020801331B1E161F08042D34111A0F1A3F3C33092101_) . $n;
                    }
                }
                if ($_obfuscated_0D1E023F2E1B0634020B402B3B0919160519335B3C2401_) {
                    $_obfuscated_0D055C152F115B0A01181C102B103B252C17401D140911_ = str_replace($width_mobil, $this->width_mobil, $_obfuscated_0D055C152F115B0A01181C102B103B252C17401D140911_);
                    $_obfuscated_0D1E023F2E1B0634020B402B3B0919160519335B3C2401_ = $_obfuscated_0D1D3F11075C2B12132A253229221B250A380A18372401_ . $_obfuscated_0D1D290130181031331A07143B213E192337062D272D11_ . $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ . $_obfuscated_0D1D290130181031331A07143B213E192337062D272D11_ . $_obfuscated_0D1D3F11075C2B12132A253229221B250A380A18372401_ . $n . $_obfuscated_0D055C152F115B0A01181C102B103B252C17401D140911_ . "{" . $n . $_obfuscated_0D1E023F2E1B0634020B402B3B0919160519335B3C2401_ . "}" . $n . $_obfuscated_0D1D3F11075C2B12132A253229221B250A380A18372401_ . $_obfuscated_0D1D290130181031331A07143B213E192337062D272D11_ . "end " . $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ . $_obfuscated_0D1D290130181031331A07143B213E192337062D272D11_ . $_obfuscated_0D1D3F11075C2B12132A253229221B250A380A18372401_ . $n;
                }
            }
        }
        $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ = "main_set";
        if (isset($data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_]) && isset($data["status"][$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_])) {
            $_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_ = array();
            foreach ($data[$_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_] as $_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_ => $_obfuscated_0D171F10103F010730381C0701342916150B270F391001_) {
                if ($_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_ == "name_filter" || $_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_ == "filter_vier" || $_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_ == "head_filter") {
                    $_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_ = "#" . $_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_;
                } else {
                    if ($_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_ == "param_gorizont") {
                        $_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_ = $_obfuscated_0D2A09240410400A125B2F35310336042C063128392832_;
                        $_obfuscated_0D171F10103F010730381C0701342916150B270F391001_ = $n . $this->cssRead($this->dir_style . "other/" . $_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_ . ".css") . $n;
                    } else {
                        if ($_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_ == "onli_param_hidis") {
                            $_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_ = "add_style";
                            $_obfuscated_0D171F10103F010730381C0701342916150B270F391001_ = $n . $this->cssRead($this->dir_style . "other/" . $_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_ . ".css") . $n;
                        } else {
                            if ($_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_ == "add_style") {
                                $_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_ = $_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_;
                                $_obfuscated_0D171F10103F010730381C0701342916150B270F391001_ = $this->enDecode(trim($_obfuscated_0D171F10103F010730381C0701342916150B270F391001_));
                            } else {
                                $_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_ = "." . $_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_;
                            }
                        }
                    }
                }
                if (is_array($_obfuscated_0D171F10103F010730381C0701342916150B270F391001_)) {
                    foreach ($_obfuscated_0D171F10103F010730381C0701342916150B270F391001_ as $key => $val) {
                        if (strlen($val) < 1) {
                            continue;
                        }
                        if ($key == "color_a") {
                            $_obfuscated_0D3F1E0E28360D030A131F1D1404241C0B153415272A22_ = $_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_ . $_obfuscated_0D112F3C043F17153C1A3F311F232B0A0A18063E0E3C11_ . "a";
                            $key = "color";
                        } else {
                            $_obfuscated_0D3F1E0E28360D030A131F1D1404241C0B153415272A22_ = $_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_;
                        }
                        $_obfuscated_0D0536371F092A0F162D3E0A334018013C241C3B112711_ = true;
                        if ($key == "display_none") {
                            $key = "display";
                            $val = "none";
                        } else {
                            if (strpos($key, "_countpercent") !== false) {
                                $key = str_replace("_countpercent", "", $key);
                                if (!$val || $val <= 1) {
                                    $_obfuscated_0D0536371F092A0F162D3E0A334018013C241C3B112711_ = false;
                                } else {
                                    $val = 100 / (int) $val - 1 . "%";
                                    if ($_obfuscated_0D0B3E2D023E195C1D33125B160934192D313E0F163922_ == "block_param") {
                                        $_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_["add_style"][] = $this->cssRead($this->dir_style . "other/block_justify.css") . $n;
                                    }
                                    $_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_[$_obfuscated_0D3F1E0E28360D030A131F1D1404241C0B153415272A22_][] = $this->videStyle("display", "inline-block");
                                }
                            } else {
                                if (strpos($key, "width") !== false || strpos($key, "height") !== false || strpos($key, "radius") !== false || strpos($key, "top") !== false || $key == "bottom" || strpos($key, "padding") !== false) {
                                    $val = (int) $val . "px";
                                }
                            }
                        }
                        $key = str_replace("_", "-", $key);
                        if ($_obfuscated_0D0536371F092A0F162D3E0A334018013C241C3B112711_) {
                            $_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_[$_obfuscated_0D3F1E0E28360D030A131F1D1404241C0B153415272A22_][] = $this->videStyle($key, $val);
                        }
                    }
                } else {
                    if (is_string($_obfuscated_0D171F10103F010730381C0701342916150B270F391001_) && $_obfuscated_0D171F10103F010730381C0701342916150B270F391001_) {
                        $_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_[$_obfuscated_0D072D5C33091A17401D081C091C3F1B34102501210332_][] = $_obfuscated_0D171F10103F010730381C0701342916150B270F391001_;
                    }
                }
            }
            if ($_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_) {
                $_obfuscated_0D2E26150F1D0B25093639041505245C081501221F2601_ .= $_obfuscated_0D1D3F11075C2B12132A253229221B250A380A18372401_ . $_obfuscated_0D1D290130181031331A07143B213E192337062D272D11_ . $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ . $_obfuscated_0D1D290130181031331A07143B213E192337062D272D11_ . $_obfuscated_0D1D3F11075C2B12132A253229221B250A380A18372401_ . $n;
                foreach ($_obfuscated_0D0419323C393427241A280D1C5B36170E2A3B5C250E22_ as $_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_ => $_obfuscated_0D020801331B1E161F08042D34111A0F1A3F3C33092101_) {
                    if ($_obfuscated_0D020801331B1E161F08042D34111A0F1A3F3C33092101_) {
                        if (strpos($_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_, "@media") !== false) {
                            $_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_ = str_replace($width_mobil, $this->width_mobil, $_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_);
                        } else {
                            if ($_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_ == "add_style") {
                                $_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_ = "";
                            }
                        }
                        if ($_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_) {
                            $_obfuscated_0D2E26150F1D0B25093639041505245C081501221F2601_ .= $_obfuscated_0D2336223E34401F0A361416150A222612183B373D2711_ . "{" . implode(" ", $_obfuscated_0D020801331B1E161F08042D34111A0F1A3F3C33092101_) . "}" . $n;
                        } else {
                            $_obfuscated_0D2E26150F1D0B25093639041505245C081501221F2601_ .= implode(" ", $_obfuscated_0D020801331B1E161F08042D34111A0F1A3F3C33092101_) . $n;
                        }
                    }
                }
                $_obfuscated_0D2E26150F1D0B25093639041505245C081501221F2601_ .= $_obfuscated_0D1D3F11075C2B12132A253229221B250A380A18372401_ . $_obfuscated_0D1D290130181031331A07143B213E192337062D272D11_ . "end " . $_obfuscated_0D1924292D023F3603313B10143E0F3103360730190701_ . $_obfuscated_0D1D290130181031331A07143B213E192337062D272D11_ . $_obfuscated_0D1D3F11075C2B12132A253229221B250A380A18372401_ . $n;
            }
        }
        $_obfuscated_0D211A223D330A0C3E0116194039050216150A5B105C11_ = $this->dir_style . "other/main_set.css";
        if ($_obfuscated_0D26222C3C0E0F3F240104213E2C332D2F38113B0B3111_ = $this->zapisFileContent($_obfuscated_0D211A223D330A0C3E0116194039050216150A5B105C11_, $_obfuscated_0D2E26150F1D0B25093639041505245C081501221F2601_ . $_obfuscated_0D1E023F2E1B0634020B402B3B0919160519335B3C2401_)) {
            $result .= $_obfuscated_0D26222C3C0E0F3F240104213E2C332D2F38113B0B3111_;
            $this->text_other_css = $_obfuscated_0D2E26150F1D0B25093639041505245C081501221F2601_ . $_obfuscated_0D1E023F2E1B0634020B402B3B0919160519335B3C2401_;
            $this->text_other_css .= $this->cssRead($this->dir_style . "other/scroll_images.css");
            $result .= " " . $this->genCss();
        }
        return $result;
    }
    private function recStylePole($data_pole, $pole, $class, $class_hover = "", $class_activ = "", $class_activ1 = "", $suf_file = "")
    {
        $result = "";
        if ($_obfuscated_0D23182804291F09121D3E0D0B3717131634100A0B2722_ = $this->cssRead($this->dir_style . "other/" . $pole . $suf_file . ".css")) {
            $_obfuscated_0D3311260940042C082E13073115292D281340252E2D01_ = "";
            $_obfuscated_0D2D39182537215B05190C0B273B03211E193F3B073032_ = "";
            $_obfuscated_0D0629342C0323095C22260D290802400F09241A051101_ = "";
            $_obfuscated_0D29081C025B25362C0C292A2932191819040C021C3211_ = "";
            foreach ($data_pole as $key => $val) {
                if (strlen($val) < 1) {
                    continue;
                }
                $key = str_replace("_", "-", $key);
                if (strpos($key, "width") !== false || strpos($key, "height") !== false || strpos($key, "radius") !== false || strpos($key, "top") !== false) {
                    $val = (int) $val . "px";
                }
                if (strpos($key, "-hover") !== false) {
                    $key = str_replace("-hover", "", $key);
                    $_obfuscated_0D2D39182537215B05190C0B273B03211E193F3B073032_ .= $this->videStyle($key, $val);
                } else {
                    if (strpos($key, "-active") !== false) {
                        $key = str_replace("-active", "", $key);
                        if ($class_activ && $key != "top") {
                            $_obfuscated_0D0629342C0323095C22260D290802400F09241A051101_ .= $this->videStyle($key, $val);
                        }
                        if ($class_activ1) {
                            if ($key == "border-color" || $key == "border-radius") {
                                continue;
                            }
                            $_obfuscated_0D29081C025B25362C0C292A2932191819040C021C3211_ .= $this->videStyle($key, $val);
                        }
                    } else {
                        $_obfuscated_0D3311260940042C082E13073115292D281340252E2D01_ .= $this->videStyle($key, $val);
                    }
                }
            }
            if ($_obfuscated_0D0629342C0323095C22260D290802400F09241A051101_) {
                $_obfuscated_0D23182804291F09121D3E0D0B3717131634100A0B2722_ = str_replace($class_activ . "{", $class_activ . "{" . $_obfuscated_0D0629342C0323095C22260D290802400F09241A051101_, $_obfuscated_0D23182804291F09121D3E0D0B3717131634100A0B2722_);
            }
            if ($_obfuscated_0D29081C025B25362C0C292A2932191819040C021C3211_) {
                $_obfuscated_0D23182804291F09121D3E0D0B3717131634100A0B2722_ = str_replace($class_activ1 . "{", $class_activ1 . "{" . $_obfuscated_0D29081C025B25362C0C292A2932191819040C021C3211_, $_obfuscated_0D23182804291F09121D3E0D0B3717131634100A0B2722_);
            }
            if ($_obfuscated_0D2D39182537215B05190C0B273B03211E193F3B073032_) {
                $_obfuscated_0D23182804291F09121D3E0D0B3717131634100A0B2722_ = str_replace($class_hover . "{", $class_hover . "{" . $_obfuscated_0D2D39182537215B05190C0B273B03211E193F3B073032_, $_obfuscated_0D23182804291F09121D3E0D0B3717131634100A0B2722_);
            }
            if ($_obfuscated_0D3311260940042C082E13073115292D281340252E2D01_) {
                $_obfuscated_0D23182804291F09121D3E0D0B3717131634100A0B2722_ = str_replace($class . "{", $class . "{" . $_obfuscated_0D3311260940042C082E13073115292D281340252E2D01_, $_obfuscated_0D23182804291F09121D3E0D0B3717131634100A0B2722_);
            }
            $result = $_obfuscated_0D23182804291F09121D3E0D0B3717131634100A0B2722_;
        }
        return $result;
    }
    private function videStyle($key, $val)
    {
        if (strlen($val) === 0) {
            return "";
        }
        $_obfuscated_0D1B381C02071F212512133223243F275B363E23011722_ = "";
        if (strpos($key, "border-width") !== false) {
            $_obfuscated_0D1B381C02071F212512133223243F275B363E23011722_ = " border-style: solid;";
        }
        return $key . ": " . $val . ";" . $_obfuscated_0D1B381C02071F212512133223243F275B363E23011722_;
    }
    public function seo_url()
    {
        $this->data["shabl"] = $shabl = "seo_url";
        $this->data["bloc_bott_save"] = false;
        $this->data["action"] = $this->url->link($this->versi_put . "/" . $this->name_mod . "/" . $shabl, $this->token_token, $this->ssl);
        $_obfuscated_0D1C2D301002251B1C0434142B095B15162E5B26211801_ = $this->data["action"];
        $this->data["cancel"] = $this->url->link($this->mod_ext, $this->token_token . $this->type_mod, $this->ssl);
        $_obfuscated_0D01111F2C32293F2B260D3E2C3F362730121A2A3B3911_ = $this->data["cancel"];
        $this->document->addScript("view/javascript/fv/sortable/jquery-ui-sortable.min.js");
        $this->data["gen_transl"] = false;
        $this->data["seo_attributes"] = array();
        $this->data["seo_options"] = array();
        $this->data["error_class_separators"] = false;
        $this->data["filter_vier_setting"] = array();
        $_obfuscated_0D15303F311B1A1F0313195B0B28233305230D22122722_ = array("filter_vier_setting", "filter_vier_url_set");
        $this->data["tab_nav"] = $this->genTab();
        $this->setSet($_obfuscated_0D15303F311B1A1F0313195B0B28233305230D22122722_);
        $_obfuscated_0D373D0B070A1B1D07112E3B240824122D2A0527065C11_ = array();
        if (isset($_POST["for_otlad"])) {
            $_obfuscated_0D373D0B070A1B1D07112E3B240824122D2A0527065C11_ = $_POST["for_otlad"];
        }
        $this->data["for_otlad"] = $_obfuscated_0D373D0B070A1B1D07112E3B240824122D2A0527065C11_;
        if (isset($this->data["filter_vier_setting"]["html_tag"])) {
            $this->html_tag = true;
        }
        if (isset($this->data["filter_vier_url_set"]["seo_url"])) {
            $this->flag_seo_url = true;
        }
        if (isset($this->data["filter_vier_url_set"]["add_group_trans"])) {
            $this->flag_add_group_trans = true;
        }
        if (isset($this->data["filter_vier_setting"]["attrb"]["tabl_ats"]) && (($tabl_ats = $this->config->get($this->tabl_ats_status)) || $tabl_ats === "0")) {
            $this->tabl_ats = true;
        }
        $this->data["control_pusto"] = $this->{$this->load_mod}->controlPusto();
        $_obfuscated_0D0E252B05091028300819015C2F39311B243C011F3B01_ = $this->data["languages"];
        $_obfuscated_0D221F1732282E3E02323627352927020E2E0513352401_ = isset($this->data["filter_vier_url_set"]["lang_translit"]) ? (int) $this->data["filter_vier_url_set"]["lang_translit"] : (int) $_obfuscated_0D0E252B05091028300819015C2F39311B243C011F3B01_[key($_obfuscated_0D0E252B05091028300819015C2F39311B243C011F3B01_)]["language_id"];
        $_obfuscated_0D0F391F2B2B02023D0308123F2F320D07160429342C22_ = array("attrb", "optv");
        $_obfuscated_0D3C2F221E283329210A19010107230B302F2D34073801_ = array();
        foreach ($_obfuscated_0D0F391F2B2B02023D0308123F2F320D07160429342C22_ as $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_) {
            $_obfuscated_0D3C2F221E283329210A19010107230B302F2D34073801_["stat_" . $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_] = false;
            $this->data["stat_" . $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_] = false;
            if (isset($this->data["filter_vier_setting"][$_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_]["status"])) {
                $_obfuscated_0D3C2F221E283329210A19010107230B302F2D34073801_["stat_" . $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_] = true;
                $this->data["stat_" . $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_] = true;
            }
        }
        $_obfuscated_0D0F391F2B2B02023D0308123F2F320D07160429342C22_ = array("manufs", "qnts", "nows", "prs", "psp");
        foreach ($_obfuscated_0D0F391F2B2B02023D0308123F2F320D07160429342C22_ as $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_) {
            $this->data["stat_" . $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_] = false;
            $this->data["seo_" . $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_] = array();
            $this->data[$_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_ . "_translit"] = NULL;
            if (isset($this->data["filter_vier_setting"][$_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_]["status"])) {
                $this->data["stat_" . $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_] = true;
            }
        }
        if (!isset($_POST["gen_transl"]) || isset($_POST["gen_transl"]) && !$this->validate()) {
            $this->whereViewParam($this->data["filter_vier_setting"]);
            $this->data["seo_attributes"] = $this->data["stat_attrb"] && is_string($this->where_attr) ? $this->seoAttribText($_obfuscated_0D221F1732282E3E02323627352927020E2E0513352401_, $this->where_attr, true) : array();
            $this->data["seo_options"] = $this->data["stat_optv"] && is_string($this->where_optv) ? $this->seoOptions($_obfuscated_0D221F1732282E3E02323627352927020E2E0513352401_, $this->where_optv) : array();
            foreach ($_obfuscated_0D0F391F2B2B02023D0308123F2F320D07160429342C22_ as $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_) {
                if ($this->data["stat_" . $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_]) {
                    if ($_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_ == "manufs") {
                        $this->data["seo_manufs"] = $this->{$this->load_mod}->seoBrand(false);
                    }
                    $_obfuscated_0D263529301D39333302253609233538362C340A253032_ = $this->{$this->load_mod}->urlMainFV($_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_, true);
                    if (isset($_obfuscated_0D263529301D39333302253609233538362C340A253032_[1][0])) {
                        $this->data[$_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_ . "_translit"] = $_obfuscated_0D263529301D39333302253609233538362C340A253032_[1][0];
                    }
                }
            }
        }
        if (isset($_POST["gen_transl"]) && $this->validate()) {
            $this->data["gen_transl"] = true;
            $_obfuscated_0D0D0106101229163F062F295C2F0C36022434220F3C11_ = microtime(true);
            $this->whereViewParam($this->data["filter_vier_setting"]);
            $this->data["seo_attributes"] = $this->data["stat_attrb"] && is_string($this->where_attr) ? $this->seoAttribText($_obfuscated_0D221F1732282E3E02323627352927020E2E0513352401_, $this->where_attr, false) : array();
            $this->data["seo_options"] = $this->data["stat_optv"] && is_string($this->where_optv) ? $this->seoOptions($_obfuscated_0D221F1732282E3E02323627352927020E2E0513352401_, $this->where_optv, false) : array();
            foreach ($_obfuscated_0D0F391F2B2B02023D0308123F2F320D07160429342C22_ as $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_) {
                if ($this->data["stat_" . $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_]) {
                    if ($_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_ == "manufs") {
                        $this->data["seo_manufs"] = $this->{$this->load_mod}->seoBrand();
                    }
                    $this->data[$_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_ . "_translit"] = $this->{$this->load_mod}->translitEng($this->data["legnd_" . $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_]);
                }
            }
            $time = microtime(true) - $_obfuscated_0D0D0106101229163F062F295C2F0C36022434220F3C11_;
            $this->session->data["success"] = $this->data["legnd_succ_gen_transl"] . " - " . round($time, 2);
        } else {
            if (isset($_POST["save"]) && $this->validateSeparators() && $this->validate()) {
                $this->load->model("setting/setting");
                $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_ = array();
                $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_ = $this->set_2;
                $value = $this->request->post[$this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_];
                if ($this->config->get($this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_)) {
                    $_obfuscated_0D1D31300314333324315B08340728290513080E351B32_ = $key = $this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_;
                    $this->model_setting_setting->editSettingValue($_obfuscated_0D1D31300314333324315B08340728290513080E351B32_, $key, $value);
                } else {
                    $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_[$this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_] = $value;
                    $this->model_setting_setting->editSetting($this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_, $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_);
                }
                $this->session->data["success"] = $this->data["text_success"];
                $this->redir($_obfuscated_0D01111F2C32293F2B260D3E2C3F362730121A2A3B3911_);
            }
        }
        $_obfuscated_0D1317310913261C0E3F0119190532181E110F3B1A1932_ = array("manufs", "attrb", "optv", "qnts", "nows", "psp", "prs");
        $_obfuscated_0D2C1804115C213B291B0B323010071A020833341D1C11_ = array();
        foreach ($_obfuscated_0D1317310913261C0E3F0119190532181E110F3B1A1932_ as $get) {
            if (isset($this->data["legnd_" . $get])) {
                $_obfuscated_0D2C1804115C213B291B0B323010071A020833341D1C11_[$get] = $this->data["legnd_" . $get];
            } else {
                $_obfuscated_0D2C1804115C213B291B0B323010071A020833341D1C11_[$get] = $get;
            }
        }
        $this->data["lang_get"] = $_obfuscated_0D2C1804115C213B291B0B323010071A020833341D1C11_;
        $_obfuscated_0D211B1835123F251230070C3E28030C1A4021360E3901_ = array();
        if (!isset($this->data["filter_vier_url_set"]["sort_get_param"])) {
            foreach ($_obfuscated_0D1317310913261C0E3F0119190532181E110F3B1A1932_ as $get) {
                if (!empty($this->data["stat_" . $get])) {
                    $_obfuscated_0D211B1835123F251230070C3E28030C1A4021360E3901_[] = $get;
                }
            }
        } else {
            foreach ($this->data["filter_vier_url_set"]["sort_get_param"] as $get) {
                if (in_array($get, $_obfuscated_0D1317310913261C0E3F0119190532181E110F3B1A1932_) && !empty($this->data["stat_" . $get])) {
                    $_obfuscated_0D211B1835123F251230070C3E28030C1A4021360E3901_[] = $get;
                }
            }
            foreach ($_obfuscated_0D1317310913261C0E3F0119190532181E110F3B1A1932_ as $get) {
                if (in_array($get, $_obfuscated_0D211B1835123F251230070C3E28030C1A4021360E3901_)) {
                    continue;
                }
                if (!empty($this->data["stat_" . $get])) {
                    $_obfuscated_0D211B1835123F251230070C3E28030C1A4021360E3901_[] = $get;
                }
            }
        }
        $this->data["filter_vier_url_set"]["sort_get_param"] = $_obfuscated_0D211B1835123F251230070C3E28030C1A4021360E3901_;
        $this->data["attrb_slider"] = array();
        if (isset($this->data["filter_vier_setting"]["attrb"]["slider"])) {
            $this->data["attrb_slider"] = $this->data["filter_vier_setting"]["attrb"]["slider"];
        }
        $this->breadcrumbs($shabl);
        $this->getTpl($shabl);
    }
    private function scanDirFile($put_dir = "", $ext = "css", $delit = ".", $img_put = NULL)
    {
        $result = array();
        if (!is_dir($put_dir)) {
            return $result;
        }
        $_obfuscated_0D4024305C0D2D252A3C0F115C0136133C1E275B1D3711_ = @scandir($put_dir);
        if (is_array($_obfuscated_0D4024305C0D2D252A3C0F115C0136133C1E275B1D3711_)) {
            foreach ($_obfuscated_0D4024305C0D2D252A3C0F115C0136133C1E275B1D3711_ as $val) {
                if (!is_file($put_dir . $val) || strpos($val, $delit . $ext) === false) {
                    continue;
                }
                $result[] = basename($val, $delit . $ext);
            }
        }
        $_obfuscated_0D1B1C191B081D2B2C211D40353E0513115C1C1A140211_ = array();
        if ($img_put && is_dir($img_put)) {
            foreach ($result as $file) {
                $_obfuscated_0D351E0C0F320F0B2E180636112F05393D182F16103511_ = $file . ".{png,jpg}";
                $_obfuscated_0D36162C170623081B13280D273B151B2203382F173232_ = glob($img_put . $_obfuscated_0D351E0C0F320F0B2E180636112F05393D182F16103511_, GLOB_BRACE);
                if (isset($_obfuscated_0D36162C170623081B13280D273B151B2203382F173232_[0]) && is_string($_obfuscated_0D36162C170623081B13280D273B151B2203382F173232_[0])) {
                    $_obfuscated_0D3D293222393C1F5C3E1F2309082D0A22020B113F1011_ = "/catalog/" . $this->dir_img . basename($_obfuscated_0D36162C170623081B13280D273B151B2203382F173232_[0]);
                    $_obfuscated_0D1B1C191B081D2B2C211D40353E0513115C1C1A140211_[$_obfuscated_0D3D293222393C1F5C3E1F2309082D0A22020B113F1011_] = $file;
                } else {
                    $_obfuscated_0D1B1C191B081D2B2C211D40353E0513115C1C1A140211_[] = $file;
                }
            }
            return $_obfuscated_0D1B1C191B081D2B2C211D40353E0513115C1C1A140211_;
        } else {
            return $result;
        }
    }
    private function redir($link_mod)
    {
        if ($this->what_versi < 2000) {
            $this->redirect($link_mod);
        } else {
            $this->response->redirect($link_mod);
        }
    }
    private function delSessiSucce($key = "success")
    {
        if (isset($this->session->data[$key])) {
            unset($this->session->data[$key]);
        }
    }
    private function seoAttribText($language_id, $where_attr, $url_base = true)
    {
        $result = array();
        $_obfuscated_0D3F38263B5C2E090613311A3F1A15170D2F2538150A01_ = $this->{$this->load_mod}->getAttribSeo($language_id, $where_attr, true, $this->tabl_ats);
        if ($url_base) {
            $_obfuscated_0D0F3D170633062435270727113D1324320F3C26262701_ = "attrb";
            $_obfuscated_0D0101101D2F0D02171B0713211908152E0D1918212F22_ = $this->{$this->load_mod}->urlMainFV($_obfuscated_0D0F3D170633062435270727113D1324320F3C26262701_);
            foreach ($_obfuscated_0D3F38263B5C2E090613311A3F1A15170D2F2538150A01_ as $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_) {
                $_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_ = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["attribute_id"];
                $_obfuscated_0D3524231D1F3611160B40330A262B340E363E32192E22_ = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["name_attr"];
                $_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_ = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["attribute_group_id"];
                $result[$_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_]["group_id"] = $_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_;
                $result[$_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_]["name_group"] = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["name_group"];
                $result[$_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_]["attrb"][$_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_]["attribute_id"] = $_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_;
                $result[$_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_]["attrb"][$_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_]["name_attr"] = $this->{$this->load_mod}->stripTags($_obfuscated_0D3524231D1F3611160B40330A262B340E363E32192E22_, $this->html_tag);
                if (isset($_obfuscated_0D0101101D2F0D02171B0713211908152E0D1918212F22_[$_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_][0])) {
                    $result[$_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_]["attrb"][$_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_][$this->text_translit] = $_obfuscated_0D0101101D2F0D02171B0713211908152E0D1918212F22_[$_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_][0];
                } else {
                    $result[$_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_]["attrb"][$_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_][$this->text_translit] = NULL;
                }
                $_obfuscated_0D2D383F0A0801282E2D122501111F17255B04092B1611_ = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["text_id"];
                $text = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["text"];
                $_obfuscated_0D1728233203401014025C2B3640122C0F033F2D3C2D01_ = $this->{$this->load_mod}->stripTags($text, $this->html_tag);
                if (!isset($_obfuscated_0D1728233203401014025C2B3640122C0F033F2D3C2D01_[0])) {
                    continue;
                }
                $result[$_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_]["attrb"][$_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_]["param"][$_obfuscated_0D2D383F0A0801282E2D122501111F17255B04092B1611_]["text_id"] = $_obfuscated_0D2D383F0A0801282E2D122501111F17255B04092B1611_;
                $result[$_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_]["attrb"][$_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_]["param"][$_obfuscated_0D2D383F0A0801282E2D122501111F17255B04092B1611_]["name_text"] = $_obfuscated_0D1728233203401014025C2B3640122C0F033F2D3C2D01_;
                if (isset($_obfuscated_0D0101101D2F0D02171B0713211908152E0D1918212F22_[$_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_][$_obfuscated_0D2D383F0A0801282E2D122501111F17255B04092B1611_])) {
                    $result[$_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_]["attrb"][$_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_]["param"][$_obfuscated_0D2D383F0A0801282E2D122501111F17255B04092B1611_][$this->text_translit] = $_obfuscated_0D0101101D2F0D02171B0713211908152E0D1918212F22_[$_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_][$_obfuscated_0D2D383F0A0801282E2D122501111F17255B04092B1611_];
                } else {
                    $result[$_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_]["attrb"][$_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_]["param"][$_obfuscated_0D2D383F0A0801282E2D122501111F17255B04092B1611_][$this->text_translit] = NULL;
                }
            }
        } else {
            $_obfuscated_0D39042829112F140B1E253E2B173D2F3B281E1F1E3401_ = false;
            if ($this->flag_add_group_trans) {
                $_obfuscated_0D39042829112F140B1E253E2B173D2F3B281E1F1E3401_ = true;
            }
            foreach ($_obfuscated_0D3F38263B5C2E090613311A3F1A15170D2F2538150A01_ as $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_) {
                $_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_ = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["attribute_id"];
                $_obfuscated_0D3524231D1F3611160B40330A262B340E363E32192E22_ = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["name_attr"];
                $_obfuscated_0D1B01012E0527030628122B0A260B1029380317210232_ = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["name_group"];
                $_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_ = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["attribute_group_id"];
                $result[$_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_]["group_id"] = $_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_;
                $result[$_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_]["name_group"] = $_obfuscated_0D1B01012E0527030628122B0A260B1029380317210232_;
                $_obfuscated_0D5B391F1A1E1214333807400C101D2D35270913220532_ = NULL;
                if ($_obfuscated_0D39042829112F140B1E253E2B173D2F3B281E1F1E3401_) {
                    $_obfuscated_0D5B391F1A1E1214333807400C101D2D35270913220532_ = $this->{$this->load_mod}->translitEng($_obfuscated_0D1B01012E0527030628122B0A260B1029380317210232_) . "-";
                }
                $_obfuscated_0D3524231D1F3611160B40330A262B340E363E32192E22_ = $this->{$this->load_mod}->stripTags($_obfuscated_0D3524231D1F3611160B40330A262B340E363E32192E22_, $this->html_tag);
                $result[$_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_]["attrb"][$_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_]["attribute_id"] = $_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_;
                $result[$_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_]["attrb"][$_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_]["name_attr"] = $_obfuscated_0D3524231D1F3611160B40330A262B340E363E32192E22_;
                $result[$_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_]["attrb"][$_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_][$this->text_translit] = $_obfuscated_0D5B391F1A1E1214333807400C101D2D35270913220532_ . $this->{$this->load_mod}->translitEng($_obfuscated_0D3524231D1F3611160B40330A262B340E363E32192E22_);
                $_obfuscated_0D2D383F0A0801282E2D122501111F17255B04092B1611_ = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["text_id"];
                $text = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["text"];
                $_obfuscated_0D1728233203401014025C2B3640122C0F033F2D3C2D01_ = $this->{$this->load_mod}->stripTags($text, $this->html_tag);
                if (!isset($_obfuscated_0D1728233203401014025C2B3640122C0F033F2D3C2D01_[0])) {
                    continue;
                }
                $result[$_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_]["attrb"][$_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_]["param"][$_obfuscated_0D2D383F0A0801282E2D122501111F17255B04092B1611_]["text_id"] = $_obfuscated_0D2D383F0A0801282E2D122501111F17255B04092B1611_;
                $result[$_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_]["attrb"][$_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_]["param"][$_obfuscated_0D2D383F0A0801282E2D122501111F17255B04092B1611_]["name_text"] = $_obfuscated_0D1728233203401014025C2B3640122C0F033F2D3C2D01_;
                $result[$_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_]["attrb"][$_obfuscated_0D0F28193801220D095B40233401113B1F2C0F17251D11_]["param"][$_obfuscated_0D2D383F0A0801282E2D122501111F17255B04092B1611_][$this->text_translit] = $this->{$this->load_mod}->translitEng($_obfuscated_0D1728233203401014025C2B3640122C0F033F2D3C2D01_);
            }
        }
        return $result;
    }
    private function viewAttributes()
    {
        $_obfuscated_0D1F08125C1B0C2305373F05272A023101130E14292322_ = $this->{$this->load_mod}->getAttributes(NULL, NULL, true);
        $result = array();
        foreach ($_obfuscated_0D1F08125C1B0C2305373F05272A023101130E14292322_ as $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_) {
            $_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_ = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["attribute_group_id"];
            $_obfuscated_0D250D372813021811290B403C140E0E0F191D342A1732_ = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["attribute_id"];
            $result[$_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_]["group_id"] = $_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_;
            $result[$_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_]["name_group"] = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["name_group"];
            $result[$_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_]["attrb"][$_obfuscated_0D250D372813021811290B403C140E0E0F191D342A1732_]["attribute_id"] = $_obfuscated_0D250D372813021811290B403C140E0E0F191D342A1732_;
            $result[$_obfuscated_0D3C1E182F36221A25330307363E245C251A1230241001_]["attrb"][$_obfuscated_0D250D372813021811290B403C140E0E0F191D342A1732_]["name_attr"] = $this->{$this->load_mod}->stripTags($_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["name_attr"], $this->html_tag);
        }
        return $result;
    }
    private function seoOptions($language_id, $where_opt, $url_base = true)
    {
        $result = array();
        $_obfuscated_0D3F38263B5C2E090613311A3F1A15170D2F2538150A01_ = $this->{$this->load_mod}->getOptions($language_id, $where_opt);
        if ($url_base) {
            $_obfuscated_0D0F3D170633062435270727113D1324320F3C26262701_ = "optv";
            $_obfuscated_0D0101101D2F0D02171B0713211908152E0D1918212F22_ = $this->{$this->load_mod}->urlMainFV($_obfuscated_0D0F3D170633062435270727113D1324320F3C26262701_);
            foreach ($_obfuscated_0D3F38263B5C2E090613311A3F1A15170D2F2538150A01_ as $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_) {
                $_obfuscated_0D22080B350B22390840212C03090A32082B11100D1422_ = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["option_id"];
                $_obfuscated_0D1B01012E0527030628122B0A260B1029380317210232_ = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["name_group"];
                $result[$_obfuscated_0D22080B350B22390840212C03090A32082B11100D1422_]["group_id"] = $_obfuscated_0D22080B350B22390840212C03090A32082B11100D1422_;
                $result[$_obfuscated_0D22080B350B22390840212C03090A32082B11100D1422_]["name_group"] = $_obfuscated_0D1B01012E0527030628122B0A260B1029380317210232_;
                if (isset($_obfuscated_0D0101101D2F0D02171B0713211908152E0D1918212F22_[$_obfuscated_0D22080B350B22390840212C03090A32082B11100D1422_][0])) {
                    $result[$_obfuscated_0D22080B350B22390840212C03090A32082B11100D1422_][$this->text_translit] = $_obfuscated_0D0101101D2F0D02171B0713211908152E0D1918212F22_[$_obfuscated_0D22080B350B22390840212C03090A32082B11100D1422_][0];
                } else {
                    $result[$_obfuscated_0D22080B350B22390840212C03090A32082B11100D1422_][$this->text_translit] = NULL;
                }
                $_obfuscated_0D08132634192B2927293F390815240411173D360E0722_ = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["option_value_id"];
                $_obfuscated_0D2E40282621072B1B1705140C3023150B07352D0C3411_ = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["name_option"];
                $result[$_obfuscated_0D22080B350B22390840212C03090A32082B11100D1422_]["param"][$_obfuscated_0D08132634192B2927293F390815240411173D360E0722_]["option_value_id"] = $_obfuscated_0D08132634192B2927293F390815240411173D360E0722_;
                $result[$_obfuscated_0D22080B350B22390840212C03090A32082B11100D1422_]["param"][$_obfuscated_0D08132634192B2927293F390815240411173D360E0722_]["name_option"] = $_obfuscated_0D2E40282621072B1B1705140C3023150B07352D0C3411_;
                if (isset($_obfuscated_0D0101101D2F0D02171B0713211908152E0D1918212F22_[$_obfuscated_0D22080B350B22390840212C03090A32082B11100D1422_][$_obfuscated_0D08132634192B2927293F390815240411173D360E0722_])) {
                    $result[$_obfuscated_0D22080B350B22390840212C03090A32082B11100D1422_]["param"][$_obfuscated_0D08132634192B2927293F390815240411173D360E0722_][$this->text_translit] = $_obfuscated_0D0101101D2F0D02171B0713211908152E0D1918212F22_[$_obfuscated_0D22080B350B22390840212C03090A32082B11100D1422_][$_obfuscated_0D08132634192B2927293F390815240411173D360E0722_];
                } else {
                    $result[$_obfuscated_0D22080B350B22390840212C03090A32082B11100D1422_]["param"][$_obfuscated_0D08132634192B2927293F390815240411173D360E0722_][$this->text_translit] = NULL;
                }
            }
        } else {
            foreach ($_obfuscated_0D3F38263B5C2E090613311A3F1A15170D2F2538150A01_ as $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_) {
                $_obfuscated_0D22080B350B22390840212C03090A32082B11100D1422_ = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["option_id"];
                $_obfuscated_0D1B01012E0527030628122B0A260B1029380317210232_ = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["name_group"];
                $result[$_obfuscated_0D22080B350B22390840212C03090A32082B11100D1422_]["group_id"] = $_obfuscated_0D22080B350B22390840212C03090A32082B11100D1422_;
                $result[$_obfuscated_0D22080B350B22390840212C03090A32082B11100D1422_]["name_group"] = $_obfuscated_0D1B01012E0527030628122B0A260B1029380317210232_;
                $result[$_obfuscated_0D22080B350B22390840212C03090A32082B11100D1422_][$this->text_translit] = $this->{$this->load_mod}->translitEng($_obfuscated_0D1B01012E0527030628122B0A260B1029380317210232_);
                $_obfuscated_0D08132634192B2927293F390815240411173D360E0722_ = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["option_value_id"];
                $_obfuscated_0D2E40282621072B1B1705140C3023150B07352D0C3411_ = $_obfuscated_0D3F2303062B2C051D1131333D1B3F0F32164022401C01_["name_option"];
                $result[$_obfuscated_0D22080B350B22390840212C03090A32082B11100D1422_]["param"][$_obfuscated_0D08132634192B2927293F390815240411173D360E0722_]["option_value_id"] = $_obfuscated_0D08132634192B2927293F390815240411173D360E0722_;
                $result[$_obfuscated_0D22080B350B22390840212C03090A32082B11100D1422_]["param"][$_obfuscated_0D08132634192B2927293F390815240411173D360E0722_]["name_option"] = $_obfuscated_0D2E40282621072B1B1705140C3023150B07352D0C3411_;
                $result[$_obfuscated_0D22080B350B22390840212C03090A32082B11100D1422_]["param"][$_obfuscated_0D08132634192B2927293F390815240411173D360E0722_][$this->text_translit] = $this->{$this->load_mod}->translitEng($_obfuscated_0D2E40282621072B1B1705140C3023150B07352D0C3411_);
            }
        }
        return $result;
    }
    private function viewOptions()
    {
        $_obfuscated_0D3E0B102639181B1B08271B37341B24333810093B0922_ = $this->{$this->load_mod}->getOptions(NULL);
        $result = array();
        foreach ($_obfuscated_0D3E0B102639181B1B08271B37341B24333810093B0922_ as $val) {
            $result[$val["option_id"]]["option_id"] = $val["option_id"];
            $result[$val["option_id"]]["name_group"] = $val["name_group"];
        }
        return $result;
    }
    private function whereViewParam($filter_vier_setting)
    {
        $_obfuscated_0D075B251D273C3B39182911032229050A010A37242922_ = $this->{$this->load_mod}->polesCount();
        if (isset($filter_vier_setting["attrb"]["view"])) {
            $_obfuscated_0D2B16111232303216245B1626110934073C133F400F11_ = array();
            if (count($filter_vier_setting["attrb"]["view"]) < $_obfuscated_0D075B251D273C3B39182911032229050A010A37242922_) {
                $_obfuscated_0D2B16111232303216245B1626110934073C133F400F11_ = $filter_vier_setting["attrb"]["view"];
            }
            $this->where_attr = $this->{$this->load_mod}->whereImplode("a.`attribute_id`", $_obfuscated_0D2B16111232303216245B1626110934073C133F400F11_, NULL);
        }
        if (isset($filter_vier_setting["optv"]["view"])) {
            $_obfuscated_0D2B16111232303216245B1626110934073C133F400F11_ = array();
            if (count($filter_vier_setting["optv"]["view"]) < $_obfuscated_0D075B251D273C3B39182911032229050A010A37242922_) {
                $_obfuscated_0D2B16111232303216245B1626110934073C133F400F11_ = $filter_vier_setting["optv"]["view"];
            }
            $this->where_optv = $this->{$this->load_mod}->whereImplode("od.`option_id`", $_obfuscated_0D2B16111232303216245B1626110934073C133F400F11_, NULL);
        }
    }
    private function getLangModule($arr_lang = array(), $arr_needle = array())
    {
        $_obfuscated_0D26103540090B0B2B041F2B2A3D080F3C2D3239340B11_ = "discript";
        if ($arr_needle) {
            foreach ($arr_lang as $k => $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_) {
                foreach ($arr_needle as $_obfuscated_0D3E3C301E181F213C242225031A330102230138220F11_ => $_obfuscated_0D173331051B211C14071F1F1B272E27190C3D2A063632_) {
                    if (strpos($k, $_obfuscated_0D173331051B211C14071F1F1B272E27190C3D2A063632_) === 0) {
                        $this->data[$_obfuscated_0D173331051B211C14071F1F1B272E27190C3D2A063632_ . $_obfuscated_0D26103540090B0B2B041F2B2A3D080F3C2D3239340B11_][ltrim($k, "_")] = $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_;
                    }
                }
                $this->data[$k] = $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_;
            }
        } else {
            foreach ($arr_lang as $k => $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_) {
                $this->data[$k] = $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_;
            }
        }
    }
    private function versionTpl()
    {
        $result = "default/template/";
        if (3000 <= $this->what_versi) {
            $result = "extension/";
        } else {
            if (2200 <= $this->what_versi) {
                $result = "";
            }
        }
        return $result;
    }
    private function addTranslitAjs($get_post)
    {
        $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_ = array();
        $duble_url = array();
        $_obfuscated_0D03180F1913112C271F21173828121E3F3E3440212F11_ = array();
        $arr_post = $this->{"parseStrAjs" . $this->new_pars}($get_post);
        if (isset($arr_post["transl"]) && $this->validateSeparators() && $this->validate()) {
            $_obfuscated_0D0D0106101229163F062F295C2F0C36022434220F3C11_ = microtime(true);
            $this->dubleSeoUrl($arr_post["transl"]);
            if (empty($this->duble_url)) {
                if ($_obfuscated_0D401F100B113C1B0D2B1312080E060C2F2405162A1832_ = $this->{$this->load_mod}->addTranslit($arr_post["transl"])) {
                    $time = microtime(true) - $_obfuscated_0D0D0106101229163F062F295C2F0C36022434220F3C11_;
                    $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["succ"] = $this->data["legnd_succ_add_transl"] . " - " . round($time, 2);
                } else {
                    if (isset($this->error["warning"])) {
                        $this->error["warning"] .= $this->data["error_add_transl"];
                    } else {
                        $this->error["warning"] = $this->data["error_add_transl"];
                    }
                }
            }
        } else {
            if (isset($this->error["warning"])) {
                $this->error["warning"] .= "; " . $this->data["error_add_transl"];
            } else {
                $this->error["warning"] = $this->data["error_add_transl"];
            }
        }
        $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["duble_url"] = $this->duble_url;
        return $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_;
    }
    private function enDecode($text)
    {
        return html_entity_decode($text, ENT_COMPAT, "UTF-8");
    }
    private function parseStrAjs($get_post)
    {
        parse_str($this->enDecode($get_post), $arr_post);
        return $this->request->clean($arr_post);
    }
    private function parseStrAjs1($get_post)
    {
        $get_post = $this->enDecode($get_post);
        $_obfuscated_0D402714082E3806390C393E041F1407112C2D15231E11_ = explode("&", $get_post);
        $arr_post = array();
        foreach ($_obfuscated_0D402714082E3806390C393E041F1407112C2D15231E11_ as $get_post) {
            parse_str($get_post, $data);
            $arr_post = $this->arrMerg($arr_post, $data);
        }
        return $arr_post;
    }
    private function arrMerg($arr_post, $data = array())
    {
        foreach ($data as $key => $val) {
            if (isset($arr_post[$key]) && is_array($arr_post[$key])) {
                $arr_post[$key] = $this->arrMerg($arr_post[$key], $val);
            } else {
                $arr_post[$key] = $this->request->clean($val);
            }
        }
        return $arr_post;
    }
    public function ajs_post()
    {
        $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_ = array();
        $_obfuscated_0D0F39090A050708113307133E1332040528323F220B32_ = "";
        $this->delSessiSucce();
        if (isset($_POST["add_hand_links"]) && $this->validate()) {
            $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_ = $this->addHandLinks($_POST["add_hand_links"], true);
            if (!$_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_) {
                $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["succ"] = $this->data["text_succ_record"];
                $this->session->data["success"] = $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["succ"];
                $_obfuscated_0D0F39090A050708113307133E1332040528323F220B32_ = "hand_links";
            }
        } else {
            if (isset($_POST["up_hand_links"]) && $this->validate()) {
                $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_ = $this->addHandLinks($_POST["up_hand_links"], false);
                if (!$_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_) {
                    $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["succ"] = $this->data["text_succ_update"];
                    $this->session->data["success"] = $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["succ"];
                    $_obfuscated_0D0F39090A050708113307133E1332040528323F220B32_ = "hand_links";
                }
            } else {
                if (isset($_POST["del_hand_links"]) && $this->validate()) {
                    if ($_obfuscated_0D373214091B0412153E2201370F06063811165B313211_ = $this->delHandLinks($_POST["del_hand_links"])) {
                        $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["succ"] = $this->data["text_succ_remove"];
                        $this->session->data["success"] = $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["succ"];
                        $_obfuscated_0D0F39090A050708113307133E1332040528323F220B32_ = "hand_links";
                    }
                } else {
                    if (isset($_POST["clear_tabl_hl"]) && $this->validate()) {
                        if ($this->delHandLinks(0)) {
                            $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["succ"] = $this->data["legnd_succ_clear_table"];
                            $this->session->data["success"] = $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["succ"];
                            $_obfuscated_0D0F39090A050708113307133E1332040528323F220B32_ = "hand_links";
                        }
                    } else {
                        if (isset($_POST["copy_tabl_hl"]) && $this->validate()) {
                            if (!$this->copyTablHl()) {
                                $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["succ"] = $this->data["text_succ_copy"];
                                $this->session->data["success"] = $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["succ"];
                                $_obfuscated_0D0F39090A050708113307133E1332040528323F220B32_ = "hand_links";
                            }
                        } else {
                            if (isset($_POST["checks_attr"]) && $this->validate()) {
                                $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_ = $this->textId($this->request->post);
                            } else {
                                if (isset($_POST["clear_cache"]) && $this->validate()) {
                                    if ($this->clearCache()) {
                                        $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["succ"] = $this->data["legnd_clear_cache_yes"] . "-" . $this->yes_dir_cache;
                                    }
                                } else {
                                    if (isset($_POST["clear_table"]) && $this->validate()) {
                                        $_obfuscated_0D2202185B043C090436143704212E3C223E2623283122_ = $this->{$this->load_mod}->clearTableUFV();
                                        if (!$_obfuscated_0D2202185B043C090436143704212E3C223E2623283122_) {
                                            $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["succ"] = $this->data["legnd_succ_clear_table"];
                                            $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["clear"] = "#block_seo_url";
                                        }
                                    } else {
                                        if (isset($_POST["add_transl"]) && $this->validate()) {
                                            $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_ = $this->addTranslitAjs($_POST["add_transl"]);
                                        } else {
                                            if (isset($_POST["base"]) && $this->validate()) {
                                                $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_ = $this->savePost($_POST["base"], "base");
                                            } else {
                                                if (isset($_POST["primenit"]) && $this->validate()) {
                                                    $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_ = $this->savePost($_POST["primenit"], "");
                                                } else {
                                                    if (isset($_POST["icon_awesome"]) && $this->validate()) {
                                                        $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["icon_awesome"] = $this->getIconAwesome($_POST["icon_awesome"]);
                                                    } else {
                                                        foreach ($this->arr_tab as $_obfuscated_0D2E3D2B35035B01380A5C16321A0E0E343F073F2C3D01_) {
                                                            if (isset($_POST[$_obfuscated_0D2E3D2B35035B01380A5C16321A0E0E343F073F2C3D01_]) && $this->validate()) {
                                                                $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_ = $this->savePost($_POST[$_obfuscated_0D2E3D2B35035B01380A5C16321A0E0E343F073F2C3D01_], $_obfuscated_0D2E3D2B35035B01380A5C16321A0E0E343F073F2C3D01_);
                                                                break;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (isset($this->error["warning"])) {
            $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["error_warning"] = $this->error["warning"];
        } else {
            if ($_obfuscated_0D0F39090A050708113307133E1332040528323F220B32_) {
                $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["redir_time"] = $_obfuscated_0D0F39090A050708113307133E1332040528323F220B32_;
            }
        }
        $this->response->addHeader("Content-Type: application/json");
        $this->response->setOutput(json_encode($_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_));
    }
    private function delHandLinks($id)
    {
        $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_ = 0;
        if (is_numeric($id)) {
            $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_ = $this->{$this->load_mod}->delHandLinksDiscript($id);
        } else {
            $this->error["warning"] = "error removed!!!";
        }
        return $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_;
    }
    private function addHandLinks($get_post = "", $flag_ins = true, $arr_post = array())
    {
        $result = array();
        $_obfuscated_0D135C3313073B070A5B333D2B2A292D313935373D1D32_ = array();
        $shabl = "hand_links";
        if (!$arr_post) {
            $arr_post = $this->parseStrAjs($get_post);
        }
        if (is_array($arr_post)) {
            if ($_obfuscated_0D2E053E271822040F343C27102B0B19271612063D3932_ = $this->{$this->load_mod}->addHandLinksDiscript($arr_post, $flag_ins)) {
                $_obfuscated_0D292E112C3D371610372124265C2A2B05180B145B0D22_ = "";
                if (!empty($_obfuscated_0D2E053E271822040F343C27102B0B19271612063D3932_["route"]) && isset($this->data["name_route"][$_obfuscated_0D2E053E271822040F343C27102B0B19271612063D3932_["route"]])) {
                    $_obfuscated_0D292E112C3D371610372124265C2A2B05180B145B0D22_ = $this->data["name_route"][$_obfuscated_0D2E053E271822040F343C27102B0B19271612063D3932_["route"]];
                }
                if (isset($_obfuscated_0D2E053E271822040F343C27102B0B19271612063D3932_["duble"])) {
                    $_obfuscated_0D135C3313073B070A5B333D2B2A292D313935373D1D32_ = $_obfuscated_0D2E053E271822040F343C27102B0B19271612063D3932_["duble"];
                    $_obfuscated_0D2C25213223080C385B3B0F293324060D3E01111A1332_ = "";
                    $_obfuscated_0D2C25213223080C385B3B0F293324060D3E01111A1332_ .= $_obfuscated_0D292E112C3D371610372124265C2A2B05180B145B0D22_;
                    $url = "index.php?route=" . $this->versi_put . "/" . $this->name_mod . "/" . $shabl . "&" . $this->token_token . "&filter_link=";
                    foreach ($_obfuscated_0D135C3313073B070A5B333D2B2A292D313935373D1D32_ as $link) {
                        $_obfuscated_0D2C25213223080C385B3B0F293324060D3E01111A1332_ .= ", <a href=\"" . $url . (string) $link . "\">" . $link . "</a>";
                    }
                    $result["duble_hand_links"] = $_obfuscated_0D135C3313073B070A5B333D2B2A292D313935373D1D32_;
                    $this->error["warning"] = $this->data["error_duble_seo_url"] . " " . $_obfuscated_0D2C25213223080C385B3B0F293324060D3E01111A1332_;
                } else {
                    if (isset($_obfuscated_0D2E053E271822040F343C27102B0B19271612063D3932_["empty_route"])) {
                        $result["warning"] = true;
                        $this->error["warning"] = $this->data["error_hl_empty"] . " " . $_obfuscated_0D292E112C3D371610372124265C2A2B05180B145B0D22_;
                    } else {
                        if (isset($_obfuscated_0D2E053E271822040F343C27102B0B19271612063D3932_["duble_alias_base"])) {
                            $result["warning"] = true;
                            $this->error["warning"] = "ERROR!! - " . $this->data["error_duble_base_url"] . " " . $this->data["legnd_hl_short_link"] . " - `" . $_obfuscated_0D2E053E271822040F343C27102B0B19271612063D3932_["duble_alias_base"] . "`";
                        } else {
                            $result["warning"] = true;
                            $this->error["warning"] = "error SQL!!!";
                        }
                    }
                }
            }
        } else {
            $result["warning"] = true;
            $this->error["warning"] = "error POST!!!";
        }
        return $result;
    }
    private function savePost($get_post, $file = "")
    {
        $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_ = array();
        $result = NULL;
        $_obfuscated_0D5B29161C1C1D3E193113130F5C01163919082D231F01_ = "";
        $arr_post = $this->parseStrAjs($get_post);
        if (is_array($arr_post)) {
            $this->delSessiSucce();
            if ($arr_post) {
                $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_ = array();
                $this->load->model("setting/setting");
                $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_ = NULL;
                $this->data["error_class_separators"] = false;
                if (isset($arr_post[$this->name_mod . $this->set_2])) {
                    $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_ = $this->set_2;
                    if (isset($arr_post[$this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_]["seo_url"])) {
                        $this->flag_seo_url = true;
                    }
                    if ($this->validateSeparators($arr_post[$this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_]["separators"])) {
                        $value = $arr_post[$this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_];
                        if ($this->{$this->load_mod}->isSettingKey($this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_)) {
                            $_obfuscated_0D1D31300314333324315B08340728290513080E351B32_ = $key = $this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_;
                            $this->model_setting_setting->editSettingValue($_obfuscated_0D1D31300314333324315B08340728290513080E351B32_, $key, $value);
                            if ($this->clearCache(false, $_obfuscated_0D1D31300314333324315B08340728290513080E351B32_)) {
                                $result .= ", " . $this->data["legnd_clear_cache_yes"] . "-" . $this->yes_dir_cache;
                            }
                        } else {
                            $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_[$this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_] = $value;
                            $_obfuscated_0D5B29161C1C1D3E193113130F5C01163919082D231F01_ = $this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_;
                        }
                        unset($value);
                        $result .= " " . $file;
                    }
                } else {
                    if (isset($arr_post[$this->name_mod . $this->set_4])) {
                        $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_ = $this->set_4;
                        $value = $arr_post[$this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_];
                        if ($this->{$this->load_mod}->isSettingKey($this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_)) {
                            $_obfuscated_0D1D31300314333324315B08340728290513080E351B32_ = $key = $this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_;
                            $this->model_setting_setting->editSettingValue($_obfuscated_0D1D31300314333324315B08340728290513080E351B32_, $key, $value);
                            if ($this->clearCache(false, $_obfuscated_0D1D31300314333324315B08340728290513080E351B32_)) {
                                $result .= ", " . $this->data["legnd_clear_cache_yes"] . "-" . $this->yes_dir_cache;
                            }
                        } else {
                            $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_[$this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_] = $value;
                            $_obfuscated_0D5B29161C1C1D3E193113130F5C01163919082D231F01_ = $this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_;
                        }
                        unset($value);
                        $result .= " " . $file;
                    } else {
                        if (isset($arr_post["set_cats"])) {
                            if ($value = $this->saveSetCats($arr_post["set_cats"])) {
                                $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_ = $this->set_5;
                                if ($this->{$this->load_mod}->isSettingKey($this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_)) {
                                    $_obfuscated_0D1D31300314333324315B08340728290513080E351B32_ = $key = $this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_;
                                    $this->model_setting_setting->editSettingValue($_obfuscated_0D1D31300314333324315B08340728290513080E351B32_, $key, $value);
                                    if ($this->clearCache(false, $_obfuscated_0D1D31300314333324315B08340728290513080E351B32_)) {
                                        $result .= ", " . $this->data["legnd_clear_cache_yes"] . "-" . $this->yes_dir_cache;
                                    }
                                } else {
                                    $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_[$this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_] = $value;
                                    $_obfuscated_0D5B29161C1C1D3E193113130F5C01163919082D231F01_ = $this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_;
                                }
                                unset($value);
                                $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["redir_time"] = "set_cats";
                                $result .= " " . $file;
                            }
                        } else {
                            if (isset($arr_post[$this->name_mod . $this->set_6])) {
                                $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_ = $this->set_6;
                                $value = $arr_post[$this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_];
                                $result = $this->saveStyle($value);
                                if ($this->{$this->load_mod}->isSettingKey($this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_)) {
                                    $_obfuscated_0D1D31300314333324315B08340728290513080E351B32_ = $key = $this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_;
                                    $this->model_setting_setting->editSettingValue($_obfuscated_0D1D31300314333324315B08340728290513080E351B32_, $key, $value);
                                    if ($this->clearCache(false, $_obfuscated_0D1D31300314333324315B08340728290513080E351B32_)) {
                                        $result .= ", " . $this->data["legnd_clear_cache_yes"] . "-" . $this->yes_dir_cache;
                                    }
                                } else {
                                    $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_[$this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_] = $value;
                                    $_obfuscated_0D5B29161C1C1D3E193113130F5C01163919082D231F01_ = $this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_;
                                }
                                $result .= " " . $file;
                                unset($value);
                            } else {
                                if (isset($arr_post["filter_vier_setting"])) {
                                    $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_ = $this->saveBase($arr_post);
                                    if (3000 <= $this->what_versi && isset($_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_[$this->model_status])) {
                                        $_obfuscated_0D371E3F31355C0F2D0E210C1F1D1F0A16062F191F2E22_ = array();
                                        $_obfuscated_0D371E3F31355C0F2D0E210C1F1D1F0A16062F191F2E22_[$this->model_status] = $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_[$this->model_status];
                                        $this->model_setting_setting->editSetting($this->model_status, $_obfuscated_0D371E3F31355C0F2D0E210C1F1D1F0A16062F191F2E22_);
                                    }
                                    $result .= $this->result_base;
                                }
                            }
                        }
                    }
                }
                if ($_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_) {
                    if ($this->clearCache(false, $_obfuscated_0D5B29161C1C1D3E193113130F5C01163919082D231F01_)) {
                        $result .= ", " . $this->data["legnd_clear_cache_yes"] . "-" . $this->yes_dir_cache;
                    }
                    $this->model_setting_setting->editSetting($this->name_mod . $_obfuscated_0D062C2913221B2F3339190A15112B193E180528021201_, $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_);
                }
                if ($this->data["error_class_separators"]) {
                    $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["error_class_separators"] = $this->data["error_class_separators"];
                }
            }
            if ($file) {
                $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["redir"] = $file;
            }
            if ($result) {
                $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["succ"] = "saves... " . $result;
            }
        } else {
            $this->error["warning"] = "error POST!!!";
        }
        return $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_;
    }
    private function saveBase($arr_post)
    {
        $result = NULL;
        $n = PHP_EOL;
        $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_ = array();
        if ($this->what_versi < 2000) {
            if (isset($arr_post["filter_vier_module"])) {
                $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_["filter_vier_module"] = $arr_post["filter_vier_module"];
            } else {
                $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_["filter_vier_module"] = array();
            }
        }
        if (isset($arr_post["filter_vier_setting"]["attrb"]["display"])) {
            foreach ($this->pole_attrb_display as $pole) {
                if ($_obfuscated_0D21371D072B0A32271717300C252B3627303417100F32_ = array_keys($arr_post["filter_vier_setting"]["attrb"]["display"], $pole)) {
                    $arr_post["filter_vier_setting"]["attrb"][$pole] = $_obfuscated_0D21371D072B0A32271717300C252B3627303417100F32_;
                }
            }
            unset($arr_post["filter_vier_setting"]["attrb"]["display"]);
        }
        if (isset($arr_post["filter_vier_setting"]["optv"]["display"])) {
            foreach ($this->pole_optv_display as $pole) {
                if ($_obfuscated_0D21371D072B0A32271717300C252B3627303417100F32_ = array_keys($arr_post["filter_vier_setting"]["optv"]["display"], $pole)) {
                    $arr_post["filter_vier_setting"]["optv"][$pole] = $_obfuscated_0D21371D072B0A32271717300C252B3627303417100F32_;
                }
            }
            unset($arr_post["filter_vier_setting"]["optv"]["display"]);
        }
        $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_[$this->model_status] = isset($arr_post[$this->model_status]) ? $arr_post[$this->model_status] : 0;
        $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_["filter_vier_setting"] = isset($arr_post["filter_vier_setting"]) ? $arr_post["filter_vier_setting"] : array();
        $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_["filter_vier_cpu"] = isset($arr_post["filter_vier_cpu"]) ? $arr_post["filter_vier_cpu"] : array();
        if (isset($arr_post["filter_vier_cache"])) {
            $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_["filter_vier_cache"] = $arr_post["filter_vier_cache"];
        } else {
            $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_["filter_vier_cache"] = 0;
        }
        $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_["filter_vier_setting"]["versi_module"] = isset($this->data["title"]) ? $this->data["title"] : "";
        $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_["filter_vier_setting"]["k"] = $this->{$this->load_mod}->colum_() ? 1 : 0;
        $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_["filter_vier_setting"]["versi"] = $this->what_versi;
        $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_["filter_vier_setting"]["versi_tpl"] = $this->versionTpl();
        if (isset($arr_post["description"])) {
            $_obfuscated_0D290A2C270736371D2A2F275B2933165C243202030A22_ = $arr_post["description"];
        } else {
            $_obfuscated_0D290A2C270736371D2A2F275B2933165C243202030A22_ = array();
        }
        if (isset($arr_post["lang"])) {
            $_obfuscated_0D2E101A0A22070A12085B233C3331342C350C39161201_ = $arr_post["lang"];
        } else {
            $_obfuscated_0D2E101A0A22070A12085B233C3331342C350C39161201_ = array();
        }
        if (isset($arr_post["mark_description"])) {
            $_obfuscated_0D082B0223382A340A1604010A2E1E3D1D301F0D251622_ = $arr_post["mark_description"];
        } else {
            $_obfuscated_0D082B0223382A340A1604010A2E1E3D1D301F0D251622_ = array();
        }
        $_obfuscated_0D110C401F0F21280A113717311D232F29103125270D32_ = $this->{$this->load_mod}->addDiscript($_obfuscated_0D290A2C270736371D2A2F275B2933165C243202030A22_, $_obfuscated_0D2E101A0A22070A12085B233C3331342C350C39161201_, $_obfuscated_0D082B0223382A340A1604010A2E1E3D1D301F0D251622_);
        if ($_obfuscated_0D110C401F0F21280A113717311D232F29103125270D32_) {
            $result .= " " . $this->data["legnd_succ_add_discript"];
        }
        $result .= " " . $this->recUserStyle($_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_["filter_vier_setting"]);
        if ($this->what_versi < 2000) {
            $result .= " " . $this->addDelVqmod((int) $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_[$this->model_status]);
        }
        $this->result_base = $result;
        return $_obfuscated_0D5B310D24031A2C173607231D0302130B02271A1A2522_;
    }
    private function recUserStyle($data)
    {
        $result = NULL;
        $n = PHP_EOL;
        $text_other_css = "";
        $this->text_other_css .= $this->cssRead($this->dir_style . "other/main_set.css") . $n;
        if (isset($data["scroll_item"])) {
            $_obfuscated_0D12335C2F10313D1B3D1D2D080522043C041D0F153022_ = (double) $data["position"];
            $_obfuscated_0D1C210340010B23033C2114013C322529081C3F123422_ = ($_obfuscated_0D12335C2F10313D1B3D1D2D080522043C041D0F153022_ ? $_obfuscated_0D12335C2F10313D1B3D1D2D080522043C041D0F153022_ : $this->item_default) * $this->scroll_item;
            $_obfuscated_0D23182804291F09121D3E0D0B3717131634100A0B2722_ = $this->cssRead($this->dir_style . "other/scroll.css");
            $text_other_css .= sprintf($_obfuscated_0D23182804291F09121D3E0D0B3717131634100A0B2722_, $_obfuscated_0D1C210340010B23033C2114013C322529081C3F123422_) . $n;
        }
        $_obfuscated_0D1434130C5C11241F2D2B0F012B262E0D0E120F240301_ = $_obfuscated_0D1F3D113233080A1E2C0C1C33052A5B0416383E262B32_ = $_obfuscated_0D2C1D403015141A330E243F3C23240624062C10092B22_ = $this->img_default;
        if (isset($data["manufs"]["img_wh"]) && ($_obfuscated_0D1D3B18172E3B402C3F090E3B3310322F1938011C3832_ = (double) $data["manufs"]["img_wh"])) {
            $_obfuscated_0D1434130C5C11241F2D2B0F012B262E0D0E120F240301_ = $_obfuscated_0D1D3B18172E3B402C3F090E3B3310322F1938011C3832_;
        }
        if (isset($data["optv"]["img_wh"]) && ($_obfuscated_0D1D3B18172E3B402C3F090E3B3310322F1938011C3832_ = (double) $data["optv"]["img_wh"])) {
            $_obfuscated_0D1F3D113233080A1E2C0C1C33052A5B0416383E262B32_ = $_obfuscated_0D1D3B18172E3B402C3F090E3B3310322F1938011C3832_;
        }
        if (isset($data["attrb"]["img_wh"]) && ($_obfuscated_0D1D3B18172E3B402C3F090E3B3310322F1938011C3832_ = (double) $data["attrb"]["img_wh"])) {
            $_obfuscated_0D2C1D403015141A330E243F3C23240624062C10092B22_ = $_obfuscated_0D1D3B18172E3B402C3F090E3B3310322F1938011C3832_;
        }
        $_obfuscated_0D23182804291F09121D3E0D0B3717131634100A0B2722_ = $this->cssRead($this->dir_style . "other/images.css");
        $text_other_css .= sprintf($_obfuscated_0D23182804291F09121D3E0D0B3717131634100A0B2722_, $_obfuscated_0D1434130C5C11241F2D2B0F012B262E0D0E120F240301_, $_obfuscated_0D1F3D113233080A1E2C0C1C33052A5B0416383E262B32_, $_obfuscated_0D2C1D403015141A330E243F3C23240624062C10092B22_) . $n;
        $this->text_other_css .= $text_other_css;
        $_obfuscated_0D211A223D330A0C3E0116194039050216150A5B105C11_ = $this->dir_style . "other/scroll_images.css";
        if ($_obfuscated_0D26222C3C0E0F3F240104213E2C332D2F38113B0B3111_ = $this->zapisFileContent($_obfuscated_0D211A223D330A0C3E0116194039050216150A5B105C11_, $text_other_css, "scroll_images")) {
            $result .= $_obfuscated_0D26222C3C0E0F3F240104213E2C332D2F38113B0B3111_;
        }
        $result .= " " . $this->genCss();
        return $result;
    }
    private function textId($get_post)
    {
        $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_ = array();
        if (isset($get_post["checks_attr"]) && $this->validate()) {
            $filter_vier_setting = array();
            $filter_vier_setting["attrb"]["view"] = $this->{$this->load_mod}->jsDecod($get_post["checks_attr"]);
            $_obfuscated_0D2F0C153229340E230D0421221A231624350C0B325C01_ = "";
            $_obfuscated_0D372A0A3F1222321E34122C4017172F053D1017231832_ = false;
            if (isset($get_post["separ"]) && $get_post["separ"]) {
                $_obfuscated_0D2F0C153229340E230D0421221A231624350C0B325C01_ = $get_post["separ"];
                $_obfuscated_0D372A0A3F1222321E34122C4017172F053D1017231832_ = true;
            }
            if (isset($get_post["html_tag"])) {
                $this->html_tag = true;
            }
            $_obfuscated_0D3D3131080C1F2A263B11130F403E3C32022229352F01_ = array();
            $_obfuscated_0D39211C1A210B073D3015403B35280A023B400E0C2D11_ = NULL;
            if ($this->flag_diap && ($_obfuscated_0D39211C1A210B073D3015403B35280A023B400E0C2D11_ = $get_post["diap_mark"]) && isset($get_post["diap_step"]) && 0 < strlen($get_post["diap_step"])) {
                $_obfuscated_0D16361E31192D391A101240105B0833273309293E2622_ = rtrim($get_post["diap_step"], $this->diap_semicolon);
                if (is_numeric($_obfuscated_0D16361E31192D391A101240105B0833273309293E2622_)) {
                    $_obfuscated_0D3D3131080C1F2A263B11130F403E3C32022229352F01_ = $_obfuscated_0D16361E31192D391A101240105B0833273309293E2622_;
                } else {
                    $_obfuscated_0D0605210919062D25232219043D360D1F05150F263B32_ = explode($this->diap_semicolon, $_obfuscated_0D16361E31192D391A101240105B0833273309293E2622_);
                    if (is_array($_obfuscated_0D0605210919062D25232219043D360D1F05150F263B32_)) {
                        foreach ($_obfuscated_0D0605210919062D25232219043D360D1F05150F263B32_ as $_obfuscated_0D390A28341131300A1A11052706232C23343822192A32_) {
                            if (trim($_obfuscated_0D390A28341131300A1A11052706232C23343822192A32_)) {
                                $_obfuscated_0D38310C3805263D3F1B0229173B5C5C2D1C1D2C102101_ = explode($this->diap_tire, $_obfuscated_0D390A28341131300A1A11052706232C23343822192A32_);
                                if (isset($_obfuscated_0D38310C3805263D3F1B0229173B5C5C2D1C1D2C102101_[0]) && isset($_obfuscated_0D38310C3805263D3F1B0229173B5C5C2D1C1D2C102101_[1])) {
                                    $_obfuscated_0D250D372813021811290B403C140E0E0F191D342A1732_ = trim($_obfuscated_0D38310C3805263D3F1B0229173B5C5C2D1C1D2C102101_[0]);
                                    $_obfuscated_0D3F2C5B3B31061632362F065B2202375B361D073D0411_ = trim($_obfuscated_0D38310C3805263D3F1B0229173B5C5C2D1C1D2C102101_[1]);
                                    if (is_numeric($_obfuscated_0D250D372813021811290B403C140E0E0F191D342A1732_) && is_numeric($_obfuscated_0D3F2C5B3B31061632362F065B2202375B361D073D0411_)) {
                                        $_obfuscated_0D3D3131080C1F2A263B11130F403E3C32022229352F01_[$_obfuscated_0D250D372813021811290B403C140E0E0F191D342A1732_] = trim($_obfuscated_0D3F2C5B3B31061632362F065B2202375B361D073D0411_);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            $this->whereViewParam1($filter_vier_setting);
            $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_["succ"] = $this->genTextId($_obfuscated_0D2F0C153229340E230D0421221A231624350C0B325C01_, $_obfuscated_0D372A0A3F1222321E34122C4017172F053D1017231832_, $_obfuscated_0D39211C1A210B073D3015403B35280A023B400E0C2D11_, $_obfuscated_0D3D3131080C1F2A263B11130F403E3C32022229352F01_);
        }
        return $_obfuscated_0D2B16022623280B28140F0936142A0C052F070D262201_;
    }
    private function genTextId($sep = false, $flag_sep = false, $diap_mark, $diap_step)
    {
        $result = NULL;
        $_obfuscated_0D0D0106101229163F062F295C2F0C36022434220F3C11_ = microtime(true);
        $_obfuscated_0D14101A033F0C07141D2E403F5B401936142227082F22_ = $this->{$this->load_mod}->genCodeAttributes1($this->view_attrb, $sep, $flag_sep, $diap_mark, $diap_step, $this->html_tag);
        $_obfuscated_0D36212F3137365B0D3432092E311A5B34071635260C01_ = microtime(true) - $_obfuscated_0D0D0106101229163F062F295C2F0C36022434220F3C11_;
        $_obfuscated_0D2336351C19070D28283D1F091C0D1332110210045B22_ = round($_obfuscated_0D36212F3137365B0D3432092E311A5B34071635260C01_, 2);
        if ($this->what_versi < 2000) {
            $_obfuscated_0D3D1B3C38065C25122C2E0E21360E183F265C0B353D01_ = "update";
        } else {
            $_obfuscated_0D3D1B3C38065C25122C2E0E21360E183F265C0B353D01_ = "edit";
        }
        if (!$_obfuscated_0D14101A033F0C07141D2E403F5B401936142227082F22_) {
            $result = $this->data["legnd_add_attribs_text"] . " (" . $_obfuscated_0D2336351C19070D28283D1F091C0D1332110210045B22_ . ")";
        } else {
            if (isset($_obfuscated_0D14101A033F0C07141D2E403F5B401936142227082F22_["no_attrib_text"])) {
                $_obfuscated_0D0F3C3C223F0E271B2D153D1B0B272A5B2A0A14070732_ = array();
                foreach ($_obfuscated_0D14101A033F0C07141D2E403F5B401936142227082F22_["no_attrib_text"] as $_obfuscated_0D0C2F12040E142E311D285C1E335B173D3F1A24280332_ => $_obfuscated_0D36312318113D5C3C3F1A3C0A04043317133622175B11_) {
                    $_obfuscated_0D273124343D27293C151B3606321B043B36042D303D11_ = "";
                    foreach ($_obfuscated_0D36312318113D5C3C3F1A3C0A04043317133622175B11_ as $_obfuscated_0D14371F5B1907360B1D105C3D2C3B055B0D3329010511_ => $text) {
                        $_obfuscated_0D0F3E3122400A022B5B013428023F165C2C1E2E101201_ = $this->{$this->load_mod}->getAttribDescr($_obfuscated_0D14371F5B1907360B1D105C3D2C3B055B0D3329010511_);
                        $_obfuscated_0D273124343D27293C151B3606321B043B36042D303D11_ .= " Error `text` for attribute: <b>" . $_obfuscated_0D0F3E3122400A022B5B013428023F165C2C1E2E101201_ . "</b> - " . $text . "; ";
                    }
                    $_obfuscated_0D0F3C3C223F0E271B2D153D1B0B272A5B2A0A14070732_[] = $_obfuscated_0D273124343D27293C151B3606321B043B36042D303D11_ . " in product ID: <a target=\"_blank\" href=\"index.php?route=catalog/product/" . $_obfuscated_0D3D1B3C38065C25122C2E0E21360E183F265C0B353D01_ . "&" . $this->token_token . "&product_id=" . $_obfuscated_0D0C2F12040E142E311D285C1E335B173D3F1A24280332_ . "\"> " . $_obfuscated_0D0C2F12040E142E311D285C1E335B173D3F1A24280332_ . "</a>";
                }
                $this->error["warning"] = " " . implode(";<br /> ", $_obfuscated_0D0F3C3C223F0E271B2D153D1B0B272A5B2A0A14070732_);
            } else {
                if (isset($_obfuscated_0D14101A033F0C07141D2E403F5B401936142227082F22_["bed_insert"])) {
                    $this->error["warning"] = " bed insert attribute_id: " . implode("; ", $_obfuscated_0D14101A033F0C07141D2E403F5B401936142227082F22_["bed_insert"]);
                } else {
                    $this->error["warning"] = "ERROR gen code!";
                }
            }
        }
        return $result;
    }
    private function whereViewParam1($filter_vier_setting)
    {
        $_obfuscated_0D28082A32262636061A1A1618343439273E3803381001_ = array("attrb");
        foreach ($_obfuscated_0D28082A32262636061A1A1618343439273E3803381001_ as $_obfuscated_0D5C221317290B1E0106265B0D0D2233281E2224151411_) {
            if (isset($filter_vier_setting[$_obfuscated_0D5C221317290B1E0106265B0D0D2233281E2224151411_]["view"])) {
                $_obfuscated_0D5C1F362640040602213B0B0D2A223E1B32321E063332_ = array_unique($filter_vier_setting[$_obfuscated_0D5C221317290B1E0106265B0D0D2233281E2224151411_]["view"]);
                asort($_obfuscated_0D5C1F362640040602213B0B0D2A223E1B32321E063332_);
                $this->{"view_" . $_obfuscated_0D5C221317290B1E0106265B0D0D2233281E2224151411_} = $_obfuscated_0D5C1F362640040602213B0B0D2A223E1B32321E063332_;
                unset($_obfuscated_0D5C1F362640040602213B0B0D2A223E1B32321E063332_);
            }
        }
    }
    private function clearCache($del_dir = false, $del_file = "")
    {
        $_obfuscated_0D0A1E371E5C0739052A1023141F0D371808335B1D0401_ = false;
        if (defined("DIR_STORAGE")) {
            $_obfuscated_0D1D2235013C132F14032D262534221626365B2B291432_ = DIR_STORAGE . $this->cache_3;
        } else {
            $_obfuscated_0D1D2235013C132F14032D262534221626365B2B291432_ = DIR_SYSTEM . $this->cache_dir;
        }
        $_obfuscated_0D373F3B04360536084029261B3605140D121E1A182411_ = true;
        if (!is_dir($_obfuscated_0D1D2235013C132F14032D262534221626365B2B291432_)) {
            $_obfuscated_0D373F3B04360536084029261B3605140D121E1A182411_ = mkdir($_obfuscated_0D1D2235013C132F14032D262534221626365B2B291432_, 511, true);
        }
        if ($_obfuscated_0D373F3B04360536084029261B3605140D121E1A182411_) {
            $_obfuscated_0D391D090F0D243F04381F3333273C2334142A302A3F11_ = scandir($_obfuscated_0D1D2235013C132F14032D262534221626365B2B291432_);
            $_obfuscated_0D5B143B390F262A370C121D18241D0A152D0129401422_ = "/^" . $this->cach_prev . "." . $del_file . "/";
            foreach ($_obfuscated_0D391D090F0D243F04381F3333273C2334142A302A3F11_ as $_obfuscated_0D0D2F0E3C28352D23173D0E210D3D12030D40061A2C01_) {
                if (preg_match($_obfuscated_0D5B143B390F262A370C121D18241D0A152D0129401422_, $_obfuscated_0D0D2F0E3C28352D23173D0E210D3D12030D40061A2C01_)) {
                    $_obfuscated_0D33362528330B075C313B05171317281B4028122E3301_ = $_obfuscated_0D1D2235013C132F14032D262534221626365B2B291432_ . $_obfuscated_0D0D2F0E3C28352D23173D0E210D3D12030D40061A2C01_;
                    unlink($_obfuscated_0D33362528330B075C313B05171317281B4028122E3301_);
                    $_obfuscated_0D0A1E371E5C0739052A1023141F0D371808335B1D0401_ = true;
                }
            }
            if ($del_dir) {
                $this->delFile($_obfuscated_0D1D2235013C132F14032D262534221626365B2B291432_);
            } else {
                $this->yes_dir_cache = $this->addFile($_obfuscated_0D1D2235013C132F14032D262534221626365B2B291432_);
            }
        }
        return $_obfuscated_0D0A1E371E5C0739052A1023141F0D371808335B1D0401_;
    }
    private function delFile($name_dir)
    {
        if (file_exists($name_dir . "index.html")) {
            unlink($name_dir . "index.html");
        }
        if (file_exists($name_dir . ".htaccess")) {
            unlink($name_dir . ".htaccess");
        }
        @rmdir($name_dir);
    }
    private function addFile($name_dir)
    {
        $_obfuscated_0D0F5C3D232924100E261F2924172A210B3F1A26312E22_ = "";
        if (!file_exists($name_dir . "index.html")) {
            $_obfuscated_0D0F5C3D232924100E261F2924172A210B3F1A26312E22_ .= file_put_contents($name_dir . "index.html", "");
        } else {
            $_obfuscated_0D0F5C3D232924100E261F2924172A210B3F1A26312E22_ .= "1";
        }
        if (!file_exists($name_dir . ".htaccess")) {
            $_obfuscated_0D0F5C3D232924100E261F2924172A210B3F1A26312E22_ .= file_put_contents($name_dir . ".htaccess", "<Files *.*>" . PHP_EOL . "Order Deny,Allow" . PHP_EOL . "Deny from all" . PHP_EOL . "</Files>");
        } else {
            $_obfuscated_0D0F5C3D232924100E261F2924172A210B3F1A26312E22_ .= "1";
        }
        return $_obfuscated_0D0F5C3D232924100E261F2924172A210B3F1A26312E22_;
    }
    private function validateSeparators($separators = "")
    {
        $result = true;
        if ($this->flag_seo_url) {
            $result = false;
            if (!$separators) {
                $separators = isset($_POST["filter_vier_url_set"]["separators"]) ? $this->request->post["filter_vier_url_set"]["separators"] : NULL;
            }
            if ($separators) {
                $arr = array_unique(preg_split("/[\\s\\+\\.\\\\-]+/", $separators, 0, PREG_SPLIT_NO_EMPTY));
                if (count($arr) === 3) {
                    $result = true;
                    $this->request->post["filter_vier_url_set"]["separators"] = implode(" ", $arr);
                }
            }
        }
        if (!$result) {
            $this->data["error_class_separators"] = true;
            if (isset($this->error["warning"])) {
                $this->error["warning"] .= " " . $this->data["error_separators"];
            } else {
                $this->error["warning"] = $this->data["error_separators"];
            }
        }
        return $result;
    }
    private function dubleSeoUrl($url_translit)
    {
        $_obfuscated_0D1024092F402702241D101A3B3F35352401395C191B22_ = "dbl_fv";
        $_obfuscated_0D0F085B183D1F2D121910313C2F131E0E34132B0C0101_ = "dbl_base";
        if (!empty($url_translit)) {
            $_obfuscated_0D3F170A0829211E230223160A111A120D350805371822_ = array();
            $_obfuscated_0D0A5C253E3F4026010636030305300F0D251D09232711_ = array();
            $i = 0;
            foreach ($url_translit as $_obfuscated_0D0F3D170633062435270727113D1324320F3C26262701_ => $val) {
                foreach ($val as $_obfuscated_0D250D372813021811290B403C140E0E0F191D342A1732_ => $_obfuscated_0D0D0A071D5C21402D313E3909170F03323F3E17220201_) {
                    foreach ($_obfuscated_0D0D0A071D5C21402D313E3909170F03323F3E17220201_ as $_obfuscated_0D0536102E0435101F3D4017171A24055C23192B030901_ => $_obfuscated_0D210F0C04141237121D1E5C220A291A300C0A0D0B1D11_) {
                        if ($_obfuscated_0D0536102E0435101F3D4017171A24055C23192B030901_ == 0) {
                            $_obfuscated_0D3F170A0829211E230223160A111A120D350805371822_[0][$i] = trim($_obfuscated_0D210F0C04141237121D1E5C220A291A300C0A0D0B1D11_);
                            $_obfuscated_0D3F170A0829211E230223160A111A120D350805371822_[1][$i][$_obfuscated_0D0F3D170633062435270727113D1324320F3C26262701_] = $_obfuscated_0D250D372813021811290B403C140E0E0F191D342A1732_;
                            $i++;
                        } else {
                            $_obfuscated_0D0A5C253E3F4026010636030305300F0D251D09232711_[] = trim($_obfuscated_0D210F0C04141237121D1E5C220A291A300C0A0D0B1D11_);
                        }
                    }
                    if (0 < count($_obfuscated_0D0D0A071D5C21402D313E3909170F03323F3E17220201_)) {
                        $_obfuscated_0D08262A020136211E2B211713211E1C15370835310922_ = array_unique($_obfuscated_0D0D0A071D5C21402D313E3909170F03323F3E17220201_);
                        $_obfuscated_0D172F2F290E2B04393539123403243B0E091932184011_ = array_diff_assoc($_obfuscated_0D0D0A071D5C21402D313E3909170F03323F3E17220201_, $_obfuscated_0D08262A020136211E2B211713211E1C15370835310922_);
                        if (!empty($_obfuscated_0D172F2F290E2B04393539123403243B0E091932184011_)) {
                            foreach ($_obfuscated_0D172F2F290E2B04393539123403243B0E091932184011_ as $k => $id) {
                                $id = trim($id);
                                if (!empty($id)) {
                                    $this->duble_url[$_obfuscated_0D1024092F402702241D101A3B3F35352401395C191B22_][] = "[" . $_obfuscated_0D0F3D170633062435270727113D1324320F3C26262701_ . "][" . $_obfuscated_0D250D372813021811290B403C140E0E0F191D342A1732_ . "][" . $k . "]";
                                }
                            }
                        }
                    }
                }
            }
            if (isset($_obfuscated_0D3F170A0829211E230223160A111A120D350805371822_[0]) && 0 < count($_obfuscated_0D3F170A0829211E230223160A111A120D350805371822_[0])) {
                $_obfuscated_0D08262A020136211E2B211713211E1C15370835310922_ = array_unique($_obfuscated_0D3F170A0829211E230223160A111A120D350805371822_[0]);
                $_obfuscated_0D172F2F290E2B04393539123403243B0E091932184011_ = array_diff_assoc($_obfuscated_0D3F170A0829211E230223160A111A120D350805371822_[0], $_obfuscated_0D08262A020136211E2B211713211E1C15370835310922_);
                $_obfuscated_0D2F240B015C34381B1E02010616392B1608392F360311_ = array_intersect($_obfuscated_0D08262A020136211E2B211713211E1C15370835310922_, $_obfuscated_0D0A5C253E3F4026010636030305300F0D251D09232711_);
                $_obfuscated_0D172F2F290E2B04393539123403243B0E091932184011_ = $_obfuscated_0D172F2F290E2B04393539123403243B0E091932184011_ + $_obfuscated_0D2F240B015C34381B1E02010616392B1608392F360311_;
                $_obfuscated_0D08182519151B2905230508151801110D063C5B330C32_ = $this->{$this->load_mod}->urlAliasBase();
                $_obfuscated_0D2A351903180B0E0E042A3C25240E2D31265C1C0C1001_ = array_intersect($_obfuscated_0D08262A020136211E2B211713211E1C15370835310922_, $_obfuscated_0D08182519151B2905230508151801110D063C5B330C32_);
                $_obfuscated_0D381B5C0A152A5B2C0629403312403D0834111D2C0422_ = array();
                if (!empty($_obfuscated_0D172F2F290E2B04393539123403243B0E091932184011_)) {
                    $_obfuscated_0D381B5C0A152A5B2C0629403312403D0834111D2C0422_[$_obfuscated_0D1024092F402702241D101A3B3F35352401395C191B22_] = $_obfuscated_0D172F2F290E2B04393539123403243B0E091932184011_;
                }
                if (!empty($_obfuscated_0D2A351903180B0E0E042A3C25240E2D31265C1C0C1001_)) {
                    $_obfuscated_0D381B5C0A152A5B2C0629403312403D0834111D2C0422_[$_obfuscated_0D0F085B183D1F2D121910313C2F131E0E34132B0C0101_] = $_obfuscated_0D2A351903180B0E0E042A3C25240E2D31265C1C0C1001_;
                }
                if (!empty($_obfuscated_0D381B5C0A152A5B2C0629403312403D0834111D2C0422_)) {
                    foreach ($_obfuscated_0D381B5C0A152A5B2C0629403312403D0834111D2C0422_ as $key => $_obfuscated_0D172F2F290E2B04393539123403243B0E091932184011_) {
                        foreach ($_obfuscated_0D172F2F290E2B04393539123403243B0E091932184011_ as $k => $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_) {
                            $_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_ = trim($_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_);
                            if (!empty($_obfuscated_0D351718350319312A0916400F1D2F18151A370B272511_)) {
                                $_obfuscated_0D0F3D170633062435270727113D1324320F3C26262701_ = key($_obfuscated_0D3F170A0829211E230223160A111A120D350805371822_[1][$k]);
                                $_obfuscated_0D250D372813021811290B403C140E0E0F191D342A1732_ = $_obfuscated_0D3F170A0829211E230223160A111A120D350805371822_[1][$k][$_obfuscated_0D0F3D170633062435270727113D1324320F3C26262701_];
                                $this->duble_url[$key][] = "[" . $_obfuscated_0D0F3D170633062435270727113D1324320F3C26262701_ . "][" . $_obfuscated_0D250D372813021811290B403C140E0E0F191D342A1732_ . "][0]";
                            }
                        }
                    }
                }
            }
            if (isset($this->duble_url[$_obfuscated_0D1024092F402702241D101A3B3F35352401395C191B22_])) {
                $_obfuscated_0D375C3D1E40355C24112F382B13040A0B2E290F021201_ = " " . $this->data["error_duble_seo_url"] . "(" . count($this->duble_url[$_obfuscated_0D1024092F402702241D101A3B3F35352401395C191B22_]) . ")";
                if (isset($this->error["warning"])) {
                    $this->error["warning"] .= $_obfuscated_0D375C3D1E40355C24112F382B13040A0B2E290F021201_;
                } else {
                    $this->error["warning"] = $_obfuscated_0D375C3D1E40355C24112F382B13040A0B2E290F021201_;
                }
            }
            if (isset($this->duble_url[$_obfuscated_0D0F085B183D1F2D121910313C2F131E0E34132B0C0101_])) {
                $_obfuscated_0D375C3D1E40355C24112F382B13040A0B2E290F021201_ = " " . $this->data["error_duble_base_url"] . "(" . count($this->duble_url[$_obfuscated_0D0F085B183D1F2D121910313C2F131E0E34132B0C0101_]) . ")";
                if (isset($this->error["warning"])) {
                    $this->error["warning"] .= $_obfuscated_0D375C3D1E40355C24112F382B13040A0B2E290F021201_;
                } else {
                    $this->error["warning"] = $_obfuscated_0D375C3D1E40355C24112F382B13040A0B2E290F021201_;
                }
            }
        }
    }
    private function genCss()
    {
        $_obfuscated_0D112F3C043F17153C1A3F311F232B0A0A18063E0E3C11_ = " ";
        $_obfuscated_0D103C340927143B083105365C3023310E11262A373632_ = $this->dir_style . $this->name_user_css;
        $_obfuscated_0D211A223D330A0C3E0116194039050216150A5B105C11_ = $_obfuscated_0D103C340927143B083105365C3023310E11262A373632_ . "/" . $this->name_user_css . ".css";
        $ch = "(" . substr(sprintf("%o", fileperms($this->dir_style)), -4) . ")";
        $_obfuscated_0D211D2F0E125B40031C122604041A23360A1210101332_ = "<b style=\"color:red;\">" . $_obfuscated_0D112F3C043F17153C1A3F311F232B0A0A18063E0E3C11_ . "%1\$s" . $_obfuscated_0D112F3C043F17153C1A3F311F232B0A0A18063E0E3C11_ . "%2\$s" . $_obfuscated_0D112F3C043F17153C1A3F311F232B0A0A18063E0E3C11_ . $ch . "</b>;";
        $result = sprintf($_obfuscated_0D211D2F0E125B40031C122604041A23360A1210101332_, "No write style", $_obfuscated_0D211A223D330A0C3E0116194039050216150A5B105C11_);
        clearstatcache();
        $_obfuscated_0D373F3B04360536084029261B3605140D121E1A182411_ = true;
        if (!file_exists($_obfuscated_0D103C340927143B083105365C3023310E11262A373632_)) {
            $_obfuscated_0D373F3B04360536084029261B3605140D121E1A182411_ = mkdir($_obfuscated_0D103C340927143B083105365C3023310E11262A373632_, 509);
        }
        if ($_obfuscated_0D373F3B04360536084029261B3605140D121E1A182411_) {
            $_obfuscated_0D26222C3C0E0F3F240104213E2C332D2F38113B0B3111_ = file_put_contents($_obfuscated_0D211A223D330A0C3E0116194039050216150A5B105C11_, $this->text_other_css);
            if ($_obfuscated_0D26222C3C0E0F3F240104213E2C332D2F38113B0B3111_ !== false) {
                $result = $_obfuscated_0D112F3C043F17153C1A3F311F232B0A0A18063E0E3C11_ . $this->data["text_success_user_css"] . ";" . $_obfuscated_0D112F3C043F17153C1A3F311F232B0A0A18063E0E3C11_;
            } else {
                $result = sprintf($_obfuscated_0D211D2F0E125B40031C122604041A23360A1210101332_, "No read", $_obfuscated_0D211A223D330A0C3E0116194039050216150A5B105C11_);
            }
        }
        return $result;
    }
    private function zapisFileContent($new_file, $text, $name = "")
    {
        $result = NULL;
        $error = "";
        if ($name) {
            $_obfuscated_0D1D290130181031331A07143B213E192337062D272D11_ = "*";
            $_obfuscated_0D1D3F11075C2B12132A253229221B250A380A18372401_ = "/";
            $n = PHP_EOL;
            $lc = $_obfuscated_0D1D3F11075C2B12132A253229221B250A380A18372401_ . $_obfuscated_0D1D290130181031331A07143B213E192337062D272D11_;
            $_obfuscated_0D263002180D0F34301F10380204061118270A211B3432_ = $_obfuscated_0D1D290130181031331A07143B213E192337062D272D11_ . $_obfuscated_0D1D3F11075C2B12132A253229221B250A380A18372401_ . $n;
            $_obfuscated_0D142C1C1C2133312A291B3C081C36161B080612331822_ = $lc . " " . $name . " " . $_obfuscated_0D263002180D0F34301F10380204061118270A211B3432_;
            $_obfuscated_0D0917051A051128010E3C0A3216222D29351603312A11_ = $lc . " end " . $name . " " . $_obfuscated_0D263002180D0F34301F10380204061118270A211B3432_;
            $text = $_obfuscated_0D142C1C1C2133312A291B3C081C36161B080612331822_ . $text . $_obfuscated_0D0917051A051128010E3C0A3216222D29351603312A11_;
        }
        $_obfuscated_0D26222C3C0E0F3F240104213E2C332D2F38113B0B3111_ = file_put_contents($new_file, $text);
        if ($_obfuscated_0D26222C3C0E0F3F240104213E2C332D2F38113B0B3111_ !== false) {
            $result = " " . $name . "; ";
        } else {
            $error = "!!!ERROR rec " . $name . ";";
        }
        if ($error) {
            $this->error["warning"] = $error;
        }
        return $result;
    }
    private function cssRead($put_file)
    {
        $result = "";
        clearstatcache();
        if (is_readable($put_file)) {
            $result = file_get_contents($put_file);
        }
        return $result;
    }
    protected function validate()
    {
        /*if (!$this->user->hasPermission("modify", $this->versi_put . "/" . $this->name_mod) || !$this->config->get($this->name_mod . $this->set_3)) {
            $this->error["warning"] = $this->data["error_permission"];
        }*/
        if ($this->what_versi < 2000) {
            return !$this->error ? true : false;
        }
        return !$this->error;
    }
    private function addDelVqmod($status_module = 0)
    {
        $result = NULL;
        $data = $this->getPutVqmod();
        if ($status_module) {
            if (file_exists($data["file_old"]) && is_file($data["file_old"]) && rename($data["file_old"], $data["file_new"])) {
                $result = " <b>installed vqMod!</b>";
            }
        } else {
            if (file_exists($data["file_old"]) && is_file($data["file_old"]) && file_exists($data["file_new"]) && is_file($data["file_new"])) {
                unlink($data["file_new"]);
            }
            if (file_exists($data["file_new"]) && is_file($data["file_new"]) && rename($data["file_new"], $data["file_old"])) {
                $result = " <b>deleted vqMod!</b>";
            }
        }
        if (file_exists($data["file_checked"]) && is_file($data["file_checked"])) {
            unlink($data["file_checked"]);
        }
        if (file_exists($data["file_mods"]) && is_file($data["file_mods"])) {
            unlink($data["file_mods"]);
        }
        if (isset($this->session->data["success"])) {
            $this->session->data["success"] .= $result;
        } else {
            $this->session->data["success"] = $result;
        }
        return $result;
    }
    private function getPutVqmod()
    {
        $name_dir = $this->request->server["DOCUMENT_ROOT"] . "/vqmod/";
        return array("file_old" => $name_dir . "xml/" . $this->name_mod . ".old_xml", "file_new" => $name_dir . "xml/" . $this->name_mod . ".xml", "file_mods" => $name_dir . "mods.cache", "file_checked" => $name_dir . "checked.cache", "name_dir" => $name_dir);
    }
    private function delTemp()
    {
        $result = NULL;
        $dir_style = DIR_CATALOG . "view/theme/default/stylesheet/filter_vier/";
        if (is_file($_obfuscated_0D34191E1B321232183F310A0E1B2502191839330C0301_ = $dir_style . $this->name_user_css . ".css")) {
            $_obfuscated_0D393D162A3B17333F2129072207090402012D1D074032_ = unlink($_obfuscated_0D34191E1B321232183F310A0E1B2502191839330C0301_);
            if ($_obfuscated_0D393D162A3B17333F2129072207090402012D1D074032_) {
                $result = " del - " . $this->name_user_css . ".css";
            }
        }
        return $result;
    }
    public function install()
    {
        $_obfuscated_0D2A345B18303B362229393E02101D082A052427120411_ = NULL;
        $result = array();
        if ($this->flag_update) {
            $this->{$this->load_mod}->deleteTablFV();
        }
        $result = $this->{$this->load_mod}->createTablFV();
        if (empty($result)) {
            $_obfuscated_0D2A345B18303B362229393E02101D082A052427120411_ .= "<b> create Tables Filter Vier! </b>";
        } else {
            $_obfuscated_0D2A345B18303B362229393E02101D082A052427120411_ .= "<b> error create Tables Filter Vier! </b>";
        }
        $_obfuscated_0D2A345B18303B362229393E02101D082A052427120411_ .= $this->delTemp();
        if (isset($this->session->data["success"])) {
            $this->session->data["success"] .= " " . $_obfuscated_0D2A345B18303B362229393E02101D082A052427120411_;
        } else {
            $this->session->data["success"] = $_obfuscated_0D2A345B18303B362229393E02101D082A052427120411_;
        }
    }
    public function uninstall()
    {
        $_obfuscated_0D2A345B18303B362229393E02101D082A052427120411_ = NULL;
        $this->clearCache(true);
        if ($this->flag_update) {
            $result = $this->{$this->load_mod}->deleteTablFV();
            if (empty($result)) {
                $_obfuscated_0D2A345B18303B362229393E02101D082A052427120411_ .= "<b> DROP Tables Filter Vier! </b>";
            } else {
                $_obfuscated_0D2A345B18303B362229393E02101D082A052427120411_ .= "<b> not DROP Tables Filter Vier! </b>";
            }
            $_obfuscated_0D2A345B18303B362229393E02101D082A052427120411_ .= $this->delTemp();
            if ($this->what_versi < 2000) {
                $_obfuscated_0D2A345B18303B362229393E02101D082A052427120411_ .= $this->addDelVqmod();
            }
            $this->load->model("setting/setting");
            $this->model_setting_setting->deleteSetting($this->name_mod);
            if (3000 <= $this->what_versi) {
                $this->model_setting_setting->deleteSetting($this->model_status);
            }
            $this->model_setting_setting->deleteSetting($this->name_mod . $this->set_2);
            $this->model_setting_setting->deleteSetting($this->name_mod . $this->set_3);
            $this->model_setting_setting->deleteSetting($this->name_mod . $this->set_4);
            $this->model_setting_setting->deleteSetting($this->name_mod . $this->set_5);
            $this->model_setting_setting->deleteSetting($this->name_mod . $this->set_6);
        } else {
            $_obfuscated_0D2A345B18303B362229393E02101D082A052427120411_ .= "<b> not DROP Tables Filter Vier! </b>";
        }
        $this->session->data["success"] = $_obfuscated_0D2A345B18303B362229393E02101D082A052427120411_;
    }
    private function whatVersion()
    {
        return (int) substr(str_replace(".", "", VERSION) . "0", 0, 4);
    }
    private function viewList($set = array())
    {
        if (version_compare(phpversion(), "5.6.0", "<") === true) {
            exit("PHP 5.6+ Required. Your version PHP:" . phpversion());
        }
        $shabl = "lic";
        $_obfuscated_0D2B3F105B3709065B1E2404351B185B24141908025C32_ = $this->genTab();
        $_obfuscated_0D0F18082A13180727033B291A1E35113531342E2B0632_ = false;
        if (is_array($set)) {
            $this->setSet($set);
        }
        if ($_obfuscated_0D0F18082A13180727033B291A1E35113531342E2B0632_) {
            $_POST = array();
            $this->data["shabl"] = $shabl;
            $this->data["bloc_bott"] = false;
            if (!$_obfuscated_0D0E3B242B350805382E38053E5C2C1319370B352C1A22_) {
                $this->error["warning"] = "!!!EROR key or domain: " . $_obfuscated_0D0E3B242B350805382E38053E5C2C1319370B352C1A22_;
            }
        }
        $this->data["tab_nav"] = $_obfuscated_0D2B3F105B3709065B1E2404351B185B24141908025C32_;
    }
    
    private function setIniFile()
    {
        $this->pif = $this->parsIniFile();
        if (isset($this->pif["data"]["update"])) {
            $this->flag_update = (int) $this->pif["data"]["update"];
        }
        if (isset($this->pif["data"]["flag_diap"])) {
            $this->flag_diap = (int) $this->pif["data"]["flag_diap"];
        }
    }
    private function parsIniFile()
    {
        $_obfuscated_0D101811070632055C224019152821281F232F17043C01_ = array();
        if (defined("DIR_TEMPLATE")) {
            $_obfuscated_0D5C0F212C06303C011C5B0F0C321D362B011B0D395B11_ = DIR_TEMPLATE . $this->versi_put . "/" . $this->name_mod . "/setting.ini";
            if (is_file($_obfuscated_0D5C0F212C06303C011C5B0F0C321D362B011B0D395B11_)) {
                $_obfuscated_0D101811070632055C224019152821281F232F17043C01_ = parse_ini_file($_obfuscated_0D5C0F212C06303C011C5B0F0C321D362B011B0D395B11_, true);
            }
        }
        return $_obfuscated_0D101811070632055C224019152821281F232F17043C01_;
    }
    private function setSet($set = array())
    {
        foreach ($set as $val) {
            if (isset($_POST[$val])) {
                $this->data[$val] = $this->request->post[$val];
            } else {
                if ($this->config->get($val)) {
                    $this->data[$val] = $this->config->get($val);
                } else {
                    $this->data[$val] = NULL;
                }
            }
        }
    }
}

?>