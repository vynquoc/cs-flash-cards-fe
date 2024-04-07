import React, { useEffect, useState } from "react";
import cardsApi from "../../api/cardsApi";
import {
  Input,
  List,
  Spin,
  Modal,
  Divider,
  Button,
  message,
  Pagination,
  Popconfirm,
} from "antd";
import { SearchOutlined, LoadingOutlined, ReadFilled } from "@ant-design/icons";
import { TAG_LIST } from "../../constants";
import MDEditor from "@uiw/react-md-editor";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Link } from "react-router-dom";
import { debounce } from "../../utils";

const AllCardsPage = () => {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [filters, setFilters] = useState({
    tags: [],
    title: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSelectTags = (newTag) => {
    const index = filters.tags.indexOf(newTag);
    let newTags = filters.tags;
    if (index !== -1) {
      newTags.splice(index, 1);
    } else {
      newTags.push(newTag);
    }
    setFilters({ ...filters, tags: newTags });
    setCurrentPage(1);
  };

  const getCards = async (params) => {
    setLoading(true);
    try {
      const response = await cardsApi.getAllCards(params);
      setCards(response.cards);
      setTotalRecords(response.metadata.total_records);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCard = async (id) => {
    update();
    try {
      await cardsApi.deleteCard(id);
      success();
      setCurrentCard(null);
      setCards((prev) => prev.filter((card) => card.id !== id));
    } catch (error) {
      console.log(error);
      updateError();
    }
  };

  const handleSearchChange = (e) => {
    setCurrentPage(1);
    setFilters({
      ...filters,
      title: e.target.value,
    });
  };

  const update = () => {
    messageApi.open({
      type: "loading",
      content: "Updating",
      duration: 0,
      key: "key",
    });
    setTimeout(messageApi.destroy, 1500);
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Deleted!",
      duration: 0,
      key: "key",
    });
    setTimeout(messageApi.destroy, 1500);
  };

  const updateError = () => {
    messageApi.open({
      type: "error",
      content: "Something wrong!",
      key: "key",
    });
  };

  useEffect(() => {
    getCards({ ...filters, page: currentPage, page_size: rowsPerPage });
  }, [filters, currentPage, rowsPerPage]);

  return (
    <div className="p-4 lg:w-[700px] lg:mx-auto">
      <Input
        size="large"
        prefix={<SearchOutlined />}
        onChange={debounce(handleSearchChange)}
      />
      <div className="flex gap-2 justify-center max-sm:justify-normal my-3 flex-wrap">
        {TAG_LIST.map((tag) => (
          <div
            onClick={() => handleSelectTags(tag)}
            className={`border-2 rounded-[20px] px-3 cursor-pointer ${
              filters?.tags?.includes(tag)
                ? "text-prim-500 border-prim-500"
                : ""
            }`}
            key={tag}
          >
            {tag}
          </div>
        ))}
      </div>
      {!loading ? (
        <>
          {cards.length > 0 && (
            <Pagination
              size="small"
              current={currentPage}
              total={totalRecords}
              showTotal={(total) => (
                <div className="absolute left-[425px] text-prim-500 text-md max-sm:left-4">
                  <ReadFilled />
                  <b className="ml-2">{total} Cards</b>
                </div>
              )}
              onChange={(page) => setCurrentPage(page)}
              pageSize={rowsPerPage}
              showSizeChanger
              rootClassName="flex justify-end mb-4"
              pageSizeOptions={[5, 10, 20, 50, 100]}
              onShowSizeChange={(current, size) => setRowsPerPage(size)}
            />
          )}

          <List
            itemLayout="vertical"
            dataSource={cards}
            renderItem={(item) => (
              <div
                onClick={() => setCurrentCard(item)}
                className="flex justify-between bg-prim-200 mb-4 border-2 border-prim-400 p-2 text-md rounded-md cursor-pointer items-center max-sm:gap-4"
              >
                <p className="font-bold">{item.title}</p>
                <div className="flex gap-1">
                  {item.tags.map((tag) => (
                    <div
                      className="bg-prim-400 text-white font-bold px-1 rounded-md"
                      key={tag}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            )}
          />
        </>
      ) : (
        <div className="flex justify-center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
        </div>
      )}
      <Modal
        open={currentCard !== null}
        centered
        footer={null}
        closable={false}
      >
        <div className="max-sm:max-h-[500px] overflow-y-scroll">
          <div className="flex justify-between pb-4 border-b">
            <div>
              <Button type="link">
                <Link to={`/edit/${currentCard?.id}`}>Edit</Link>
              </Button>
              <Popconfirm
                placement="right"
                onConfirm={() => handleDeleteCard(currentCard.id)}
                okText="Yes"
                cancelText="No"
                title="Delete this card?"
              >
                <Button>Delete</Button>
              </Popconfirm>
            </div>
            <Button
              className="font-bold"
              type="primary"
              onClick={() => setCurrentCard(null)}
            >
              Close
            </Button>
          </div>
          <div className="max-h-[700px] overflow-y-scroll">
            <p className="text-xl font-bold text-center mt-6">
              {currentCard?.title}
            </p>
            {currentCard?.description !== "" && (
              <>
                <Divider style={{ color: "#d3d3d3" }}>Description</Divider>
                <div data-color-mode="light">
                  <MDEditor.Markdown source={currentCard?.description} />
                </div>
              </>
            )}
            <Divider style={{ color: "#d3d3d3" }}>Content</Divider>
            <div data-color-mode="light">
              <MDEditor.Markdown source={currentCard?.content} />
            </div>
            {currentCard?.code_snippet && (
              <>
                <Divider style={{ color: "#d3d3d3" }}>Code</Divider>
                <div data-color-mode="light">
                  <SyntaxHighlighter
                    language={currentCard?.code_snippet?.language}
                    customStyle={{ height: "100%" }}
                  >
                    {currentCard?.code_snippet?.code}
                  </SyntaxHighlighter>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
      {contextHolder}
    </div>
  );
};

export default AllCardsPage;
