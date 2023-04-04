module.exports = (sequelize, Sequelize) => {
    const SGJiwaREG = sequelize.define("sg_jiwa_reg", {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        state: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        product_id: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        user_id: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        name_debitur:{
            type: Sequelize.STRING(255),
            allowNull: true
        },
        no_identitas: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        birth_place: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        birth_date: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        gender: {
            type: Sequelize.STRING(50),
            allowNull: true
        },  
        email:{
            type: Sequelize.STRING(250),
            allowNull: true
        },
        mobile:{
            type: Sequelize.STRING(250),
            allowNull: true
        },
        heir:{
            type: Sequelize.STRING(250),
            allowNull: true
        },
        heir_relationship:{
            type: Sequelize.STRING(250),
            allowNull: true
        },
        polis:{
            type: Sequelize.STRING(250),
            allowNull: true
        },
        coverage:{
            type: Sequelize.FLOAT,
            allowNull: true
        },
        premi:{
            type: Sequelize.FLOAT,
            allowNull: true
        },
        start_date:{
            type: Sequelize.STRING(50),
            allowNull: true
        },
        end_date:{
            type: Sequelize.STRING(50),
            allowNull: true
        },
        message_main_attachment_id:{
            type: Sequelize.BIGINT,
            allowNull: true
        },
        create_uid:{
            type: Sequelize.BIGINT,
            allowNull: true
        },
        create_date:{
            type: Sequelize.STRING(50),
            allowNull: true
        },
        start_date:{
            type: Sequelize.STRING(50),
            allowNull: true
        },
        write_uid:{
            type: Sequelize.BIGINT,
            allowNull: true
        },
        write_date:{
            type: Sequelize.STRING(50),
            allowNull: true
        },
        order_id:{
            type: Sequelize.BIGINT,
            allowNull: true
        },
        start_date:{
            type: Sequelize.STRING(50),
            allowNull: true
        },
        payment_method:{
            type: Sequelize.STRING(50),
            allowNull: true
        },
        va:{
            type: Sequelize.BIGINT,
            allowNull: true
        },
        payment_log_id:{
            type: Sequelize.BIGINT,
            allowNull: true
        }
    }, 
    {
        underscored: true,
        createAt: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        tableName: 'sg_jiwa_reg'
    });
    
    return SGJiwaREG;
}