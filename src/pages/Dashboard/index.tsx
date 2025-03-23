import {Card, List, Button, Row, Col, Flex, Image} from 'antd' // 引入 Flex 和 Input 组件
import {useEffect, useState} from 'react'
import {getRecentBooks, getLatestNotes, getReadingStats} from './serve'
import {Book, Note, ReadingStats} from '../../repository/data'
import BookCard from './components/BookCard' // 引入 BookCard 组件
import './index.less' // 引入自定义样式
import 'tailwindcss/tailwind.css' // 引入 Tailwind CSS 样式
import {Typography} from 'antd'
import {faker} from '@faker-js/faker'

const DashboardPage = () => {
    const [recentBooks, setRecentBooks] = useState<Book[]>([])
    const [latestNotes, setLatestNotes] = useState<Note[]>([])
    const [readingStats, setReadingStats] = useState<ReadingStats>({
        hoursThisMonth: 0
    })

    useEffect(() => {
        const fetchData = async () => {
            const books = await getRecentBooks()
            const notes = await getLatestNotes()
            const stats = await getReadingStats()
            setRecentBooks(books)
            setLatestNotes(notes)
            setReadingStats(stats)
        }
        fetchData().then();
    }, [])

    return (
        <div className="p-4">
            <div className="dashboard-page-title ">
                <Typography.Title level={2} className="m-0">
                    仪表板
                </Typography.Title>
            </div>
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={17}>
                    <Row>
                        <Col span={24}>
                            <div>
                                <Typography.Title level={3}>最近阅读的书籍</Typography.Title>
                                <Flex justify="space-between" className="book-cards-container">
                                    {recentBooks.map((book, index) => (
                                        <BookCard key={index} {...book} />
                                    ))}
                                </Flex>
                            </div>
                        </Col>
                        <Col span={24}>
                            <Card
                                title="本月的阅读时间统计"
                                className="rounded-2xl shadow-md"
                                bordered={false}
                            >
                                <p>本月阅读时间: {readingStats.hoursThisMonth} 小时</p>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} lg={7}>
                    <div className="rounded-2xl shadow-md new-notes-card">
                        <Typography.Title level={3}>最新笔记</Typography.Title>
                        <List
                            dataSource={latestNotes}
                            renderItem={(item) => (
                                <List.Item style={{padding: '8px 0'}}>
                                    <Card
                                        className="flex flex-col items-center rounded-2xl shadow-md w-full new-note-card"
                                        bordered={false}
                                        style={{width: '100%'}}
                                    >
                                        <div
                                            className="flex flex-col items-center w-full p-4 new-note-card-top-container">
                                            <Row>
                                                <Col span={12}>
                                                    <Image
                                                        src={`${faker.image.url()}?random=${Math.random()}`}
                                                        alt="Book Thumbnail"
                                                        preview={false}
                                                        height={'5rem'}
                                                        width={'5rem'}
                                                        style={{borderRadius: '15%', objectFit: 'cover'}}
                                                        className="w-16 h-16 mb-2"
                                                    />
                                                </Col>
                                                <Col span={12}>
                                                    <p className="font-bold">书名</p>
                                                    <p className="text-gray-500">作者</p>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="w-full p-4 new-note-card-bottom-container">
                                            <p className="text-gray-500">时间: 2023-10-01</p>
                                            <p className="truncate">
                                                {item.content.length > 50
                                                    ? `${item.content.substring(0, 50)}...`
                                                    : item.content}
                                            </p>
                                            <Button type="link">跳转到读书位置</Button>
                                        </div>
                                    </Card>
                                </List.Item>
                            )}
                            split={false} // 去掉分割线
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default DashboardPage
