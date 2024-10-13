"use client";
import style from "./page.module.css";
import { useEffect, useState, useCallback } from "react";
import { Table, Select, Form, Input, Pagination } from "antd";
import { ConfigProvider } from "antd";
import { getPackOptions, getTypeOptions, getCard } from "@/api/card";
import { optionType, cardType, queryType } from "@/type/card";

export default function Page() {
  const [form] = Form.useForm();
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
    },
    {
      title: "卡牌背面",
      dataIndex: "back",
      render: renderText,
    },
    {
      title: "卡牌类型",
      dataIndex: "type",
    },
    {
      title: "从属包",
      dataIndex: "pack",
    },
  ];
  const [packOption, setPackOptions] = useState<optionType[]>([]);
  const [typeOption, setTypeOptions] = useState<optionType[]>([]);
  const [tableData, setTableData] = useState<cardType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  useEffect(() => {
    getPackOptions().then((res) => {
      setPackOptions(res);
    });
    getTypeOptions().then((res) => {
      setTypeOptions(res);
    });
  }, []);
  const searchCard = useCallback(() => {
    const params = {
      page: currentPage.toString(),
      pageSize: pageSize.toString(),
      pack: form.getFieldValue("pack").join(","),
      types: form.getFieldValue("types").join(","),
      keyword: form.getFieldValue("keyword"),
    };
    getCard(params).then((res) => {
      setTableData(res.rows.map((item) => ({ ...item, key: item.id })));
      setTotal(res.count);
    });
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
            labelFontSize: 20,
          },
          Table: {
            cellFontSize: 16,
          },
        },
        token: {
          fontFamily: "Mi sans",
        },
      }}
    >
      <div className={style.container}>
        <div className={style.filter}>
          <Form
            layout="inline"
            form={form}
            initialValues={{
              types: [],
              pack: [],
              keyword: "",
            }}
            onValuesChange={handleConditionChange}
          >
            <Form.Item label="卡牌类型" name="types">
              <Select
                mode="multiple"
                allowClear
                style={{ width: "200px" }}
                placeholder="请选择卡牌类型"
                options={typeOption}
              />
            </Form.Item>
            <Form.Item label="从属包" name="pack">
              <Select
                mode="multiple"
                allowClear
                style={{ width: "200px" }}
                placeholder="请选择从属包"
                options={packOption}
              />
            </Form.Item>
            <Form.Item label="关键词" name="keyword">
              <Input placeholder="请输入关键词" style={{ width: "200px" }} />
            </Form.Item>
          </Form>
        </div>
        <div className={style.table}>
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={{
              defaultCurrent: currentPage,
              defaultPageSize: pageSize,
              total: total,
              onChange: handlePaginationChange,
            }}
          />
        </div>
      </div>
    </ConfigProvider>
  );
}
