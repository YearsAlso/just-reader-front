import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Alert, Button} from 'antd' // 引入Button组件
import {RootState} from '../../../redux/store.ts'
import {setInitStatus} from '../../../redux/slices/configSlice.ts'
import {useNavigate} from 'react-router-dom'
import {event} from '@tauri-apps/api' // 引入invoke

const ConnectionStatusPage: React.FC = () => {
    const initStatus = useSelector((state: RootState) => state.config.initStatus)
    const dbType = useSelector((state: RootState) => state.config.dbType)
    const sqliteConfig = useSelector((state: RootState) => {
        state.config.dbType === 'sqlite' ? {dbPath: state.config.dbPath} : null
    });
    const mysqlConfig = useSelector((state: RootState) => {
        state.config.dbType === 'mysql' ? {
            host: state.config.mysqlHost,
            user: state.config.mysqlUser,
            password: state.config.mysqlPassword,
            database: state.config.mysqlDatabase
        } : null
    });
    const postgresConfig = useSelector((state: RootState) => {
        state.config.dbType === 'postgresql' ? {
            host: state.config.postgresHost,
            user: state.config.postgresUser,
            password: state.config.postgresPassword,
            database: state.config.postgresDatabase
        } : null
    });
    const dispatch = useDispatch()
    const navigate = useNavigate() // 新增导航

    useEffect(() => {
        if (initStatus === 'initing') {
            const config = dbType === 'sqlite' ? sqliteConfig : dbType === 'mysql' ? mysqlConfig : postgresConfig

            event.emit('init_database', {dbType, config})
                .then(() => {
                    dispatch(setInitStatus('inited'))
                })
                .catch(() => {
                    dispatch(setInitStatus('failed'))
                })
        }
    }, [initStatus])

    if (initStatus === 'initing') {
        return (
            <div style={{padding: '20px', textAlign: 'center'}}>
                <Alert message="数据库连接中..." type="info" showIcon/>
                <p>请稍等片刻</p>
                <p>正在连接数据库...</p>
                <p>连接中...</p>
            </div>
        )
    }

    return (
        <div style={{padding: '20px', textAlign: 'center'}}>
            {initStatus === 'inited' ? (
                <>
                    <Alert message="数据库连接成功" type="success" showIcon/>
                    <Button type="primary" onClick={() => navigate('/')}>
                        返回首页
                    </Button>{' '}
                    {/* 添加按钮 */}
                </>
            ) : (
                <Alert message="数据库连接失败" type="error" showIcon/>
            )}
        </div>
    )
}

export default ConnectionStatusPage
