import axios from "axios";
import React, { useEffect, useState, useRef } from "react"
import { Input, Button, Popover } from 'antd';
import { QueryAPI } from "../../access";
import './index.scss';
type ContentList = {
  type: "client" | "server",
  content: string
}
const { TextArea } = Input;
export const Chatbot = () => {
  const contentListHistory: any = localStorage.getItem('contentListChat');
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [content, setContent] = useState("");
  const messageContentRef = useRef<any>();
  const [listContent, setListContent] = useState<ContentList[]>(() => JSON.parse(contentListHistory) ?? []);

  const listMenu = [
    {
      type: "server",
      content: "Which items do you sell?"
    },
    {
      type: "server",
      content: "Hello"
    },
    {
      type: "server",
      content: "Shoes"
    },
    {
      type: "server",
      content: "Iphone"
    },
  ]
  console.log(typeof listContent)

  const fetchRespon = (value: string) => {
    axios.get(QueryAPI.chatbot.send(value))
      .then(res => {
        setListContent(prev => ([...prev, { type: "server", content: res.data }]))
      })
      .catch(err => {
        alert(err);
      })
  }
  useEffect(() => {
    messageContentRef.current?.scrollIntoView({ behavior: 'smooth' })
    localStorage.setItem('contentListChat', JSON.stringify(listContent));

  }, [listContent])
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const contentMenu = (
    listMenu.map((item: any) => {
      return <Button type="primary" onClick={() => {
        setListContent(prev => ([...prev, { type: "client", content: item.content }]))
        fetchRespon(item.content)
        setOpen(false);
      }
      }>
        {item.content}
      </Button>
    })
  );
  return <div style={{ position: "relative" }}>
    {!visible && <button className="btn-chat" onClick={() => setVisible(true)}>
      <i className="chat-icon fa-brands fa-facebook-messenger"></i>
    </button>
    }
    {visible && <div className="chat-modal" style={{ position: "absolute", bottom: "100px" }}>
      <div className="chat">
        <div className="chat-title">
          <h1>Chatbot</h1>
          <div className="chat-close">
            <button className="btn-close" onClick={() => setVisible(false)}>
              <i className="close-icon fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
        <div className="messages">
          <div className="messages-content" >
            {
              listContent?.map((item: any) => {
                if (item?.type === "client") {
                  return <span className="client">{item?.content}</span>
                } else {
                  return <span className="server" dangerouslySetInnerHTML={{ __html: item?.content }} />
                }
              })}
            <div ref={messageContentRef} />
          </div>
        </div>
        <div className="message-box">
          <Input className="message-input" value={content} onChange={(e) => {
            setContent(e.target.value)
          }
          } placeholder="Type message..." />
          {content?.trim() ? <Button type="primary" onClick={() => {
            setListContent(prev => ([...prev, { type: "client", content: content }]))
            setContent("")
            fetchRespon(content);
          }} className="message-submit">Send</Button>
            : <Popover
              content={contentMenu}
              title="Menu questions"
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
            >
              <Button className="message-submit">Menu</Button>

            </Popover>
          }
        </div>
      </div>
      <div className="bg"></div>
    </div>
    }
  </div>
}
