import {
  Button,
  Flex,
  Form,
  Input,
  Radio,
  Select,
  Typography,
  message,
} from "antd";
import { TAG_LIST } from "../../constants";
import { useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import cardsApi from "../../api/cardsApi";

const options = TAG_LIST.map((item) => ({ label: item, value: item }));

const CardForm = ({ card, mode }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async () => {
    console.log(form.getFieldsValue());
    update();
    try {
      if (mode === "add") {
        await cardsApi.createCard(form.getFieldsValue());
        form.resetFields();
      } else {
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
      updateError();
    }
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

  const updateError = () => {
    messageApi.open({
      type: "error",
      key: "card",
      content: "Something wrong!",
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
        <Typography.Title>
          {mode === "add" ? "Add Card" : `Edit ${card?.id}`}
        </Typography.Title>
        <Button type="primary" size="large" onClick={handleSubmit}>
          Save
        </Button>
      </Flex>
      <Form
        layout="vertical"
        form={form}
        onFinish={(values) => console.log(values)}
      >
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Tags" name="tags">
          <Select mode="multiple" options={options} />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <MDEditor data-color-mode="light" />
        </Form.Item>
        <Form.Item label="Content" name="content">
          <MDEditor data-color-mode="light" />
        </Form.Item>
        <Form.Item label="Language" name={["code_snippet", "language"]}>
          <Radio.Group>
            <Radio value={"go"}>Go</Radio>
            <Radio value={"python"}>Python</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Snippet" name={["code_snippet", "code"]}>
          <Input.TextArea style={{ height: "350px" }} />
        </Form.Item>
      </Form>
      {contextHolder}
    </div>
  );
};

export default CardForm;
