import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GoldOutlined } from "@ant-design/icons";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import {
    addLanguageActionCreator,
    changeLanguageActionCreator,
} from "../../redux/language/languageActions";
import { useTranslation } from "react-i18next";
import jwt_decode, { JwtPayload as DefaultJwtPayload } from "jwt-decode";
import { userSlice } from "../../redux/user/slice";

interface JwtPayload extends DefaultJwtPayload {
    username: string;
}

export const Header: React.FC = () => {
    const navigate = useNavigate(); // 可以進行頁面的處理
    const location = useLocation(); // 當前的頁面信息
    const param = useParams(); // 獲取url中的參數

    const language = useSelector((state) => state.language.language);
    const languageList = useSelector((state) => state.language.languageList);

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const jwt = useSelector((state) => state.user.token);

    const [username, setUsername] = useState(""); // 將初始化數據設為空字符串

    const shoppingCartItems = useSelector((state) => state.shoppingCart.items);
    const shoppingCartLoading = useSelector(
        (state) => state.shoppingCart.loading
    );

    useEffect(() => {
        if (jwt) {
            const token = jwt_decode<JwtPayload>(jwt);
            setUsername(token.username); //使用setUsername更新用戶數據
        }
    }, [jwt]);

    const menuClickHandler = (e) => {
        console.log(e);
        if (e.key === "new") {
            dispatch(addLanguageActionCreator("新語言", "new_lang"));
        } else {
            dispatch(changeLanguageActionCreator(e.key));
        }
    };

    const onLogout = () => {
        dispatch(userSlice.actions.logOut());
        navigate("/");
    };

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
                                onClick={menuClickHandler}
                                items={[
                                    ...languageList.map((l) => {
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
                        {language === "zh" ? "中文" : "English"}
                    </Dropdown.Button>

                    {jwt ? (
                        <Button.Group className={styles["button-group"]}>
                            <span>
                                {t("header.welcome")}
                                <Typography.Text strong>
                                    {username}
                                </Typography.Text>
                            </span>
                            <Button
                                loading={shoppingCartLoading}
                                onClick={() => navigate("/shoppingCart")}
                            >
                                {t("header.shoppingCart")}(
                                {shoppingCartItems.length})
                            </Button>
                            <Button onClick={onLogout}>
                                {t("header.signOut")}
                            </Button>
                        </Button.Group>
                    ) : (
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
                    )}
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
                        React 旅遊網
                    </Typography.Title>
                </span>
                <Input.Search
                    placeholder="請輸入旅遊目的地 主題或關鍵字"
                    className={styles["search-input"]}
                    onSearch={(keyword) => navigate("/search/" + keyword)}
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
};
