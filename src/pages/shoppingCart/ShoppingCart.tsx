import React from "react";
import styles from "./ShoppingCart.module.css";
import { MainLayout } from "../../layouts";
import { Row, Col, Affix } from "antd";
import { ProductList, PaymentCard } from "../../components";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import {
    clearShoppingCartItem,
    checkout,
} from "../../redux/shoppingCart/slice";
import { useNavigate } from "react-router-dom";

export const ShoppingCartPage: React.FC = () => {
    const loading = useSelector((state) => state.shoppingCart.loading);
    const shoppingCartItems = useSelector((state) => state.shoppingCart.items);
    const jwt = useSelector((state) => state.user.token) as string;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <MainLayout>
            <Row>
                {/* 購物車清單 */}
                <Col span={16}>
                    <div className={styles["product-list-container"]}>
                        <ProductList
                            data={shoppingCartItems.map((s) => s.touristRoute)}
                        />
                    </div>
                </Col>
                {/* 支付卡組件 */}
                <Col span={8}>
                    <Affix>
                        <div className={styles["payment-card-container"]}>
                            <PaymentCard
                                loading={loading}
                                originalPrice={shoppingCartItems
                                    .map((s) => s.originalPrice)
                                    .reduce((a, b) => a + b, 0)}
                                price={shoppingCartItems
                                    .map(
                                        (s) =>
                                            s.originalPrice *
                                            (s.discountPresent
                                                ? s.discountPresent
                                                : 1)
                                    )
                                    .reduce((a, b) => a + b, 0)}
                                onCheckout={() => {
                                    if (shoppingCartItems.length <= 0) {
                                        return;
                                    } else {
                                        dispatch(checkout(jwt));
                                        navigate("/placeOrder");
                                    }
                                }}
                                onShoppingCartClear={() => {
                                    dispatch(
                                        clearShoppingCartItem({
                                            jwt,
                                            itemIds: shoppingCartItems.map(
                                                (s) => s.id
                                            ),
                                        })
                                    );
                                }}
                            />
                        </div>
                    </Affix>
                </Col>
            </Row>
        </MainLayout>
    );
};
