"use client";
import style from "./page.module.css";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Select, Form, Input, Button, Row, Col, Spin, Pagination } from "antd";
import { ConfigProvider } from "antd";
import { getPackOptions, getTypeOptions, getCard } from "@/api/card";
import { optionType, cardType } from "@/type/card";
import { debounce } from "lodash";

export default function Page() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const debouncedSearchCard = useMemo(() => {
    return debounce((params, onSuccess, onFinish) => {
      getCard(params)
        .then((res) => {
          onSuccess(res);
          onFinish();
        })
        .catch(() => onFinish());
    }, 1000);
  }, []);

  useEffect(() => {
    const checkIsMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth <= 768);
      }
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const [packOption, setPackOptions] = useState<optionType[]>([]);
  const [typeOption, setTypeOptions] = useState<optionType[]>([]);
  const [tableData, setTableData] = useState<cardType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(24);
  // 双面卡（人物牌/箴言牌）的翻面状态：cardId -> 是否显示背面
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  const isFlippable = (card: cardType) =>
    (card.type === 5 || card.type === 6) && !!card.back_image;

  const handlePaginationChange = (page: number, size?: number) => {
    setCurrentPage(page);
    setPageSize(size || 24);
  };

  const getTypeName = (type: number) =>
    typeOption.find((item) => item.value == type)?.label || "未知类型";
  const getPackName = (pack: number) =>
    packOption.find((item) => item.value == pack)?.label || "未知包";

  useEffect(() => {
    setLoading(true);
    Promise.all([getPackOptions(), getTypeOptions()])
      .then(([packRes, typeRes]) => {
        setPackOptions(packRes);
        setTypeOptions(typeRes);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const searchCard = useCallback(() => {
    setLoading(true);
    const params = {
      page: currentPage.toString(),
      pageSize: pageSize.toString(),
      packs: form.getFieldValue("pack")?.join(",") || "",
      types: form.getFieldValue("types")?.join(",") || "",
      keyword: form.getFieldValue("keyword") || "",
    };
    debouncedSearchCard(
      params,
      (res: { rows: cardType[]; count: number }) => {
        setTableData(res.rows.map((item) => ({ ...item, key: item.id })));
        setTotal(res.count);
      },
      () => setLoading(false)
    );
  }, [currentPage, pageSize, form, debouncedSearchCard]);

  useEffect(() => {
    searchCard();
  }, [currentPage, pageSize, searchCard]);

  const handleConditionChange = () => {
    setCurrentPage(1);
    searchCard();
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1a1a1a",
          borderRadius: 10,
          fontFamily: '"Noto Serif SC", serif',
          fontSize: isMobile ? 14 : 15,
          controlHeight: 40,
        },
      }}
    >
      <div className={style.container}>
        <header className={style.header}>
          <div className={style.headTitle}>
            <h1>卡牌查询</h1>
            <span>Cards</span>
          </div>
          <a className={style.back} href="/huashuo">
            ← 返回玩家专区
          </a>
        </header>

        <div className={style.filter}>
          <Form
            layout={isMobile ? "vertical" : "vertical"}
            form={form}
            initialValues={{ types: [], pack: [], keyword: "" }}
            onValuesChange={handleConditionChange}
            className={style.searchForm}
          >
            <Row gutter={[16, 8]} align="bottom">
              <Col xs={24} sm={12} md={7}>
                <Form.Item label="卡牌类型" name="types">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="全部类型"
                    options={typeOption}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={7}>
                <Form.Item label="从属包" name="pack">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="全部包"
                    options={packOption}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item label="关键词" name="keyword">
                  <Input allowClear placeholder="搜索卡面文字" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={4}>
                <Form.Item label={isMobile ? " " : " "} className={style.btnItem}>
                  <Button block type="primary" onClick={searchCard}>
                    搜索
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>

        <Spin spinning={loading}>
          {tableData.length === 0 && !loading ? (
            <div className={style.empty}>没有找到符合条件的卡牌</div>
          ) : (
            <div className={style.cardGrid}>
              {tableData.map((card) => (
                <div className={style.card} key={card.id}>
                  <div className={style.cardTags}>
                    <span className={style.typeTag}>{getTypeName(card.type)}</span>
                    <span className={style.packTag}>{getPackName(card.pack)}</span>
                  </div>
                  {card.front_image && (
                    <div
                      className={style.cardFace}
                      style={{ cursor: isFlippable(card) ? "pointer" : "default" }}
                      title={
                        isFlippable(card)
                          ? flipped[card.id]
                            ? "点击查看正面"
                            : "点击查看背面"
                          : undefined
                      }
                      onClick={
                        isFlippable(card)
                          ? () => setFlipped((s) => ({ ...s, [card.id]: !s[card.id] }))
                          : undefined
                      }
                    >
                      <img
                        src={(flipped[card.id] ? card.back_image : card.front_image) || undefined}
                        alt={flipped[card.id] ? card.back || card.front : card.front}
                        loading="lazy"
                      />
                      {isFlippable(card) && (
                        <span className={style.faceBadge}>{flipped[card.id] ? "背面" : "正面"}</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {total > 0 && (
            <div className={style.pagination}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={handlePaginationChange}
                showSizeChanger={!isMobile}
                pageSizeOptions={["12", "24", "48"]}
                showTotal={(t) => `共 ${t} 张`}
              />
            </div>
          )}
        </Spin>
      </div>
    </ConfigProvider>
  );
}
