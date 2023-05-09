import { Table } from "antd";

const CustomTable = (props) => {
  const { type, dataSource, columns, pagination, size } = props;

  const TYPE =
    type === "member" ? (
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        size="small"
        rowKey={(render) => render.id}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              props.handleModClick(record);
            },
          };
        }}
      />
    ) : (
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        rowKey={(render) => render.id}
        size={size}
      />
    );
  return TYPE;
};

export default CustomTable;