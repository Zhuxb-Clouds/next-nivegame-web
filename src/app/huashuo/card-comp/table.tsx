"use client";
import style from "./page.module.css";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Table, Select, Form, Input, Button, Row, Col, Spin } from "antd";
import { ConfigProvider } from "antd";
import { getPackOptions, getTypeOptions, getCard } from "@/api/card";
import { optionType, cardType, queryType } from "@/type/card";
import { debounce } from "lodash";
import { ColumnsType } from "antd/es/table";

export default function Page() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  // 新增：用 state 存储是否为移动端（初始值设为 false，避免 SSR 报错）
  const [isMobile, setIsMobile] = useState(false);
  const debouncedSearchCard = useMemo(() => {
    return debounce((params, onSuccess, onFinish) => {
      getCard(params)
        .then((res) => {
          onSuccess(res);
          onFinish();
        })
        .catch(() => onFinish());
    }, 1000); // 500ms 防抖时间可按需调整
  }, []);
  // 新增：使用 useEffect 检测窗口大小（仅在客户端执行）
  useEffect(() => {
    const checkIsMobile = () => {
      // 仅在浏览器环境执行
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth <= 768);
      }
    };
    // 初始检测
    checkIsMobile();
    // 监听窗口大小变化（可选，根据需求决定是否需要实时响应）
    window.addEventListener("resize", checkIsMobile);
    // 组件卸载时移除监听
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []); // 空依赖数组：只在组件挂载时执行一次

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 20);
  };

  const renderText = (text: string) => {
    if (!text) return null;
    const sentences = text.split("\r\n");
    return (
      <>
        {sentences.map((sentence, index) => (
          <div key={index}>
            {sentence}
            <br />
          </div>
        ))}
      </>
    );
  };

  const columns: ColumnsType<cardType> = [
    {
      title: "卡牌正面",
      dataIndex: "front",
      render: renderText,
      minWidth: 300,
    },
    {
      title: "卡牌背面",
      dataIndex: "back",
      render: renderText,
      minWidth: 300,
    },
    {
      title: "卡牌类型",
      dataIndex: "type",
      ellipsis: true,
      width: isMobile ? "200px" : "300px",
      align: "center",
      render: (type: number) => {
        const typeName = typeOption.find((item) => item.value == type);
        return typeName ? typeName.label : "未知类型";
      },
    },
    {
      title: "从属包",
      dataIndex: "pack",
      ellipsis: true,
      width: isMobile ? "200px" : "300px",
      align: "center",
      render: (pack: number) => {
        const packName = packOption.find((item) => item.value == pack);
        return packName ? packName.label : "未知包";
      },
    },
  ];

  const [packOption, setPackOptions] = useState<optionType[]>([]);
  const [typeOption, setTypeOptions] = useState<optionType[]>([]);
  const [tableData, setTableData] = useState<cardType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

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
        setTableData(
          res.rows.map((item: cardType) => ({
            ...item,
            key: item.id,
          }))
        );
        setTotal(res.count);
      },
      () => {
        setLoading(false);
      }
    );
  }, [currentPage, pageSize, form]);

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
        components: {
          Form: {
            labelFontSize: isMobile ? 14 : 16,
          },
          Table: {
            cellFontSize: isMobile ? 14 : 16,
          },
        },
        token: {
          fontFamily: "Mi sans",
          fontSize: isMobile ? 14 : 16,
        },
      }}
    >
      <div className={style.container}>
        <Spin spinning={loading} wrapperClassName={style.spinWrapper}>
          <div className={style.filter}>
            <Form
              layout={isMobile ? "vertical" : "inline"}
              form={form}
              initialValues={{ types: [], pack: [], keyword: "" }}
              onValuesChange={handleConditionChange}
              className={style.searchForm}
              colon
            >
              <Row gutter={[16, 16]} justify="start">
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="卡牌类型" name="types">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="请选择卡牌类型"
                      options={typeOption}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="从属包" name="pack">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="请选择从属包"
                      options={packOption}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="关键词" name="keyword">
                    <Input placeholder="请输入关键词" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <div className={style.submitBtn}>
                    <Form.Item>
                      <Button
                        type="primary"
                        onClick={searchCard}
                        htmlType="submit"
                        style={{ marginRight: 8 }}
                      >
                        搜索
                      </Button>
                      <Button type="default" onClick={() => form.resetFields()}>
                        重置
                      </Button>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>

          <div className={style.tableContainer}>
            <Table
              columns={columns}
              tableLayout="auto"
              dataSource={tableData}
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: total,
                onChange: handlePaginationChange,
                showSizeChanger: !isMobile,
                pageSizeOptions: ["10", "20", "50", "100"],
                showTotal: (total) => `共 ${total} 条`,
              }}
              scroll={{ x: "100%" }}
              size={isMobile ? "small" : "middle"}
              style={{
                maxWidth: "90vw",
              }}
            />
          </div>
        </Spin>
      </div>
    </ConfigProvider>
  );
}
