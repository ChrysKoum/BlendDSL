import { memo, ReactNode } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { MdEdit } from "react-icons/md";

export type TurboNodeData = {
  title: string;
  icon?: ReactNode;
  subline?: string;
};

export default memo(
  ({
    data,
    isConnectable,
  }: NodeProps<TurboNodeData> & {
    isLeftSidebarOpen: boolean;
    onEditClick: () => void;
  }) => {
    return (
      <>
        <div className="cloud gradient">
          <div>
            <MdEdit />
          </div>
        </div>
        <div className="wrapper gradient">
          <div className="inner">
            <div className="body">
              {data.icon && <div className="icon">{data.icon}</div>}
              <div>
                <div className="title">{data.title}</div>
                {data.subline && <div className="subline">{data.subline}</div>}
              </div>
            </div>
            <Handle
              type="target"
              position={Position.Left}
              id="target-turbo"
              isConnectable={isConnectable}
            />
            <Handle
              type="source"
              position={Position.Right}
              id="source-turbo"
              isConnectable={isConnectable}
            />
          </div>
        </div>
      </>
    );
  }
);
