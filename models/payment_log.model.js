module.exports = (sequelize, Sequelize) => {
    const Paymentlog = sequelize.define("payment_log", {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        order_id: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        user_id: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        amount: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        status: {
            type: Sequelize.TINYINT,
            allowNull: false
        },
        log_json:{
            type: Sequelize.TEXT,
            allowNull: true
        },
        xid: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        polis: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        channel: {
            type: Sequelize.STRING(50),
            allowNull: true
        },  
        xpayment_id:{
            type: Sequelize.STRING(50),
            allowNull: true
        }
    }, 
    {
        underscored: true,
        createAt: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        tableName: 'payment_log'
    });
    
    return Paymentlog;
}