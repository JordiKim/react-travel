import React, { useState, useEffect } from "react";
import styles from "./DetailPage.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin, Row, Col, Divider, Typography, Anchor, Menu } from "antd";
import {
    Header,
    Footer,
    ProductIntro,
    ProductComments,
} from "../../components";
import { DatePicker, Space, Button } from "antd";
import { commentMockData } from "./mockup";
import {
    productDetailSlice,
    getProductDetail,
} from "../../redux/productDetail/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { MainLayout } from "../../layouts";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addShoppingCartItem } from "../../redux/shoppingCart/slice";

const { RangePicker } = DatePicker;

type MatchParams = {
    touristRouteId: string;
    other: string;
};

export const DetailPage: React.FC = () => {
    const { touristRouteId } = useParams<MatchParams>();
    // const [loading, setLoading] = useState<boolean>(true);
    // const [product, setProduct] = useState<any>(null);
    // const [error, setError] = useState<string | null>(null);
    const loading = useSelector((state) => state.productDetail.loading);
    const product = useSelector((state) => state.productDetail.data);
    const error = useSelector((state) => state.productDetail.error);

    const dispatch = useAppDispatch();

    // 將取得jwt 時強制轉換為string
    const jwt = useSelector((state) => state.user.token) as string;
    const shoppingCartLoading = useSelector(
        (state) => state.shoppingCart.loading
    );

    useEffect(() => {
        if (touristRouteId) {
            dispatch(getProductDetail(touristRouteId));
        }
    }, []);
    if (loading) {
        return (
            <Spin
                size="large"
                style={{
                    marginTop: 200,
                    marginBottom: 200,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%",
                }}
            ></Spin>
        );
    }

    if (error) {
        return <div>網站出錯：{error}</div>;
    }
    return (
        <MainLayout>
            {/* 產品簡介與日期選擇 */}
            <div className={styles["product-intro-container"]}>
                <Row>
                    <Col span={13}>
                        <ProductIntro
                            title={product.title}
                            shortDescription={product.description}
                            price={product.originalPrice}
                            coupons={product.coupons}
                            points={product.points}
                            discount={product.price}
                            rating={product.rating}
                            pictures={product.touristRoutePictures.map(
                                (p) => p.url
                            )}
                        ></ProductIntro>
                    </Col>
                    <Col span={11}>
                        <Button
                            style={{
                                marginTop: 50,
                                marginBottom: 30,
                                display: "block",
                            }}
                            type="primary"
                            danger
                            loading={shoppingCartLoading}
                            onClick={() => {
                                dispatch(
                                    addShoppingCartItem({
                                        jwt,
                                        touristRouteId: product.id,
                                    })
                                );
                            }}
                        >
                            <ShoppingCartOutlined />
                            放入購物車
                        </Button>
                        <RangePicker open style={{ marginTop: 20 }} />
                    </Col>
                </Row>
            </div>
            {/* 錨點菜單 */}
            <Anchor className={styles["product-detail-anchor"]}>
                <Menu mode={"horizontal"}>
                    <Menu.Item key={1}>
                        <Anchor.Link
                            href="#feature"
                            title="產品特色"
                        ></Anchor.Link>
                    </Menu.Item>
                    <Menu.Item key={2}>
                        <Anchor.Link href="#fees" title="費用"></Anchor.Link>
                    </Menu.Item>
                    <Menu.Item key={3}>
                        <Anchor.Link
                            href="#notes"
                            title="預定須知"
                        ></Anchor.Link>
                    </Menu.Item>
                    <Menu.Item key={4}>
                        <Anchor.Link
                            href="#comments"
                            title="用戶評價"
                        ></Anchor.Link>
                    </Menu.Item>
                </Menu>
            </Anchor>
            {/* 產品特色 */}
            <div id="feature" className={styles["product-detail-container"]}>
                <Divider orientation={"center"}>
                    <Typography.Title level={3}>產品特色</Typography.Title>
                </Divider>
                <div
                    dangerouslySetInnerHTML={{ __html: product.features }}
                    style={{ margin: 50 }}
                ></div>
            </div>
            {/* 費用 */}
            <div id="fees" className={styles["product-detail-container"]}>
                <Divider orientation={"center"}>
                    <Typography.Title level={3}>費用</Typography.Title>
                </Divider>
                <div
                    dangerouslySetInnerHTML={{ __html: product.fees }}
                    style={{ margin: 50 }}
                ></div>
            </div>
            {/* 預定須知 */}
            <div id="notes" className={styles["product-detail-container"]}>
                <Divider orientation={"center"}>
                    <Typography.Title level={3}>預定須知</Typography.Title>
                </Divider>
                <div
                    dangerouslySetInnerHTML={{ __html: product.notes }}
                    style={{ margin: 50 }}
                ></div>
            </div>
            {/* 商品評價 */}
            <div id="comments" className={styles["product-detail-container"]}>
                <Divider orientation={"center"}>
                    <Typography.Title level={3}>用戶評價</Typography.Title>
                </Divider>
                <div style={{ margin: 40 }}>
                    <ProductComments data={commentMockData}></ProductComments>
                </div>
            </div>
        </MainLayout>
    );
};
