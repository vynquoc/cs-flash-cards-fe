import { Button, Flex, Form, Input, Radio, Select, message } from "antd";
import { TAG_LIST } from "../../constants";
import { useEffect } from "react";
import dayjs from "dayjs";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import MDEditor from "@uiw/react-md-editor";
import cardsApi from "../../api/cardsApi";
import ImageUpload from "..";

const options = TAG_LIST.map((item) => ({ label: item, value: item }));

const CardForm = ({ card, mode }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async () => {
    try {
      if (mode === "add") {
        add();
        const data = {
          ...form.getFieldsValue(),
          next_review_date: dayjs().add(1, "day"),
        };
        await cardsApi.createCard(data);
        form.resetFields();
      } else {
        update();
        const editData = {};
        for (const [key, value] of Object.entries(card)) {
          const newValue = form.getFieldValue(key);
          if (value !== newValue) {
            editData[key] = newValue;
          }
        }
        await cardsApi.updateCard(card.id, editData);
      }
      success();
    } catch (error) {
      if (error.response.status.toString().startsWith(4)) {
        updateError("Invalid data. Check your input");
      } else {
        updateError("Something went wrong");
      }
    }
  };

  const add = () => {
    messageApi.open({
      type: "loading",
      key: "card",
      content: "Adding",
      duration: 0,
    });
    setTimeout(messageApi.destroy, 1500);
  };

  const update = () => {
    messageApi.open({
      type: "loading",
      key: "card",
      content: "Updating",
      duration: 0,
    });
    setTimeout(messageApi.destroy, 1500);
  };

  const success = () => {
    messageApi.open({
      type: "success",
      key: "card",
      content: mode === "add" ? "Added!" : "Updated!",
      duration: 0,
    });
    setTimeout(messageApi.destroy, 1500);
  };

  const updateError = (msg) => {
    messageApi.open({
      type: "error",
      key: "card",
      threshold: 4,
      content: msg,
    });
  };

  const handleSetDescriptionImage = (url) => {
    const prev = form.getFieldValue("description");
    form.setFieldsValue({
      description: `${prev ? prev : ""}\n![image](${url})`,
    });
  };

  const handleSetContentImage = (url) => {
    const prev = form.getFieldValue("content");
    form.setFieldsValue({
      content: `${prev ? prev : ""}\n![image](${url})`,
    });
  };

  useEffect(() => {
    if (card) {
      form.setFieldsValue(card);
    }
  }, [card]);
  return (
    <div className="p-8 max-sm:p-2">
      <Flex justify="space-between" align="center">
        <p className="text-lg font-bold text-prim-500">
          {mode === "add" ? "Add Card" : `Edit ${card?.id}`}
        </p>
        <Button type="primary" size="middle" onClick={handleSubmit}>
          Save
        </Button>
      </Flex>
      <Form
        layout="vertical"
        form={form}
        onFinish={(values) => console.log(values)}
      >
        <Form.Item label={<p className="font-semibold">Title</p>} name="title">
          <Input />
        </Form.Item>
        <Form.Item label={<p className="font-semibold">Tags</p>} name="tags">
          <Select mode="multiple" options={options} />
        </Form.Item>
        <Form.Item
          data-color-mode="light"
          label={
            <div className="flex items-center gap-2">
              <p className="font-semibold">Description</p>
              <ImageUpload onSetImage={handleSetDescriptionImage} />
            </div>
          }
          name="description"
        >
          <MDEditor className="!h-96" />
        </Form.Item>
        <Form.Item
          data-color-mode="light"
          label={
            <div className="flex items-center gap-2">
              <p className="font-semibold">Content</p>
              <ImageUpload onSetImage={handleSetContentImage} />
            </div>
          }
          name="content"
        >
          <MDEditor className="!h-96" />
        </Form.Item>
        <Form.Item
          label={<p className="font-semibold">Language</p>}
          name={["code_snippet", "language"]}
        >
          <Radio.Group>
            <Radio value={"go"}>Go</Radio>
            <Radio value={"python"}>Python</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label={<p className="font-semibold">Snippet</p>}
          name={["code_snippet", "code"]}
        >
          <Input.TextArea style={{ height: "350px" }} />
        </Form.Item>
      </Form>
      {contextHolder}
    </div>
  );
};

export default CardForm;
