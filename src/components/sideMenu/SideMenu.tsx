import React from "react";
import styles from "./SideMenu.module.css";
import { sideMenuList } from "./mockup";
import { Menu } from "antd";
import { GifOutlined } from "@ant-design/icons";

export const SideMenu: React.FC = () => {
    return (
        <Menu
            className={styles["side-menu"]}
            mode={"vertical"}
            items={sideMenuList.map((m) => ({
                label: m.title,
                icon: <GifOutlined></GifOutlined>,
                key: m.title,
                children: m.subMenu.map((sm) => ({
                    key: sm.title,
                    label: sm.title,
                    icon: <GifOutlined></GifOutlined>,
                    children: sm.subMenu.map((sms) => ({
                        key: sms,
                        label: sms,
                        icon: <GifOutlined></GifOutlined>,
                    })),
                })),
            }))}
        ></Menu>
    );
};
