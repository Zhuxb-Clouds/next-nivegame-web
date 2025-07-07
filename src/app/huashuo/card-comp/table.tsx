"use client";
import style from "./page.module.css";
import { useEffect, useState, useCallback } from "react";
import { Table, Select, Form, Input, Pagination, Row, Col, Spin } from "antd";
import { ConfigProvider } from "antd";
import { getPackOptions, getTypeOptions, getCard } from "@/api/card";
import { optionType, cardType, queryType } from "@/type/card";

export default function Page() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 20);
  };

  const renderText = (text: string) => {
    if (!text) return null;
    // 如果一句进行到结尾，则插入换行，通过句号、感叹号、问号、省略号、破折号、来判断，这里只考虑中文，句子最末尾不换行
    const sentences = text.split("\r\n");
    return (
      <>
        {sentences.map((sentence, index) => {
          return (
            <div key={index}>
              {sentence}
              <br />
            </div>
          );
        })}
      </>
    );
  };

  const columns = [
    {
      title: "卡牌正面",
      dataIndex: "front",
      render: renderText,
      ellipsis: true, // 超出显示省略号
    },
    {
      title: "卡牌背面",
      dataIndex: "back",
      render: renderText,
      ellipsis: true, // 超出显示省略号
    },
    {
      title: "卡牌类型",
      dataIndex: "type",
      ellipsis: true, // 超出显示省略号
    },
    {
      title: "从属包",
      dataIndex: "pack",
      ellipsis: true, // 超出显示省略号
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
    Promise.all([
      getPackOptions(),
      getTypeOptions()
    ]).then(([packRes, typeRes]) => {
      setPackOptions(packRes);
      setTypeOptions(typeRes);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
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
    getCard(params).then((res) => {
      setTableData(res.rows.map((item) => ({ ...item, key: item.id })));
      setTotal(res.count);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [currentPage, pageSize, form]);

  useEffect(() => {
    searchCard();
  }, [currentPage, pageSize, searchCard]);

  const handleConditionChange = () => {
    setCurrentPage(1);
    searchCard();
  };

  // 检测是否是移动端
  const isMobile = window.innerWidth <= 768;

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelFontSize: isMobile ? 16 : 20,
          },
          Table: {
            cellFontSize: isMobile ? 14 : 16,
          },
        },
        token: {
          fontFamily: "Mi sans",
        },
      }}
    >
      <div className={style.container}>
        <Spin spinning={loading}>
          <div className={style.filter}>
            <Form
              layout={isMobile ? "vertical" : "inline"}
              form={form}
              initialValues={{
                types: [],
                pack: [],
                keyword: "",
              }}
              onValuesChange={handleConditionChange}
              className={style.searchForm}
            >
              <Row gutter={[16, 12]}>
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
                      <button
                        type="button"
                        className={style.searchButton}
                        onClick={searchCard}
                      >
                        搜索
                      </button>
                      <button
                        type="button"
                        className={style.resetButton}
                        onClick={() => form.resetFields()}
                      >
                        重置
                      </button>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>

          <div className={style.tableContainer}>
            <Table
              columns={columns}
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
              scroll={{ x: 'max-content' }}
              size={isMobile ? 'small' : 'middle'}
            />
          </div>
        </Spin>
      </div>
    </ConfigProvider>
  );
}