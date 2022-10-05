import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GoldOutlined } from "@ant-design/icons";
import { withRouter, RouteComponentProps } from "../../helpers/withRouter";
import { RootState } from "../../redux/store";
import { withTranslation, WithTranslation } from "react-i18next";
import {
    addLanguageActionCreator,
    changeLanguageActionCreator,
} from "../../redux/language/languageActions";
import { connect } from "react-redux";
import { Dispatch } from "redux";

const mapStateToProps = (state: RootState) => {
    return {
        language: state.language.language,
        languageList: state.language.languageList,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        changeLanguage: (code: "zh" | "en") => {
            const action = changeLanguageActionCreator(code);
            dispatch(action);
        },
        addLanguage: (name: string, code: string) => {
            const action = addLanguageActionCreator(name, code);
            dispatch(action);
        },
    };
};

type PropsType = RouteComponentProps & // react-router 路由props類型
    WithTranslation & // i18n的props類型
    ReturnType<typeof mapStateToProps> & // react store的映射類型
    ReturnType<typeof mapDispatchToProps>; // react dispatch的映射類型

class HeaderComponnet extends React.Component<PropsType> {
    menuClickHandler = (e) => {
        console.log(e);
        if (e.key === "new") {
            this.props.addLanguage("新語言", "new_lang");
        } else {
            this.props.changeLanguage(e.key);
        }
    };

    render() {
        const { navigate, t } = this.props;
        return (
            <div className={styles["app-header"]}>
                {/* top-header */}
                <div className={styles["top-header"]}>
                    <div className={styles.inner}>
                        <Typography.Text>{t("header.slogan")}</Typography.Text>
                        <Dropdown.Button
                            style={{ marginLeft: 15 }}
                            overlay={
                                <Menu
                                    onClick={this.menuClickHandler}
                                    items={[
                                        ...this.props.languageList.map((l) => {
                                            return {
                                                key: l.code,
                                                label: l.name,
                                            };
                                        }),
                                        {
                                            key: "new",
                                            label: t("header.add_new_language"),
                                        },
                                    ]}
                                ></Menu>
                            }
                            icon={<GoldOutlined></GoldOutlined>}
                        >
                            {this.props.language === "zh" ? "中文" : "English"}
                        </Dropdown.Button>
                        <Button.Group className={styles["button-group"]}>
                            <Button
                                onClick={() => {
                                    navigate("/register");
                                }}
                            >
                                {t("header.register")}
                            </Button>
                            <Button
                                onClick={() => {
                                    navigate("/signin");
                                }}
                            >
                                {t("header.signin")}
                            </Button>
                        </Button.Group>
                    </div>
                </div>
                <Layout.Header className={styles["main-header"]}>
                    <span
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        <img src={logo} alt="" className={styles["App-logo"]} />
                        <Typography.Title level={3} className={styles.title}>
                            {t("header.title")}
                        </Typography.Title>
                    </span>
                    <Input.Search
                        placeholder="請輸入旅遊目的地 主題或關鍵字"
                        className={styles["search-input"]}
                    ></Input.Search>
                </Layout.Header>
                <Menu
                    className={styles["main-menu"]}
                    mode={"horizontal"}
                    items={[
                        { key: "1", label: t("header.home_page") },
                        { key: "2", label: t("header.weekend") },
                        { key: "3", label: t("header.group") },
                        { key: "4", label: t("header.backpack") },
                        { key: "5", label: t("header.private") },
                        { key: "6", label: t("header.cruise") },
                        { key: "7", label: t("header.hotel") },
                        { key: "8", label: t("header.local") },
                        { key: "9", label: t("header.theme") },
                        { key: "10", label: t("header.custom") },
                        { key: "11", label: t("header.study") },
                        { key: "12", label: t("header.visa") },
                        { key: "13", label: t("header.enterprise") },
                        { key: "14", label: t("header.high_end") },
                        { key: "15", label: t("header.outdoor") },
                        { key: "16", label: t("header.insurance") },
                    ]}
                ></Menu>
            </div>
        );
    }
}

export const Header = connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(withRouter(HeaderComponnet)));
