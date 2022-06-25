import styled from 'styled-components';

export const Container = styled.form`

    width: 100%;
    max-height: 80vh;
    margin: 0 auto 2rem;
    background: #EDEDED;
    padding: 2rem;
    border-radius: .25rem;
    overflow-y: auto;

    .row {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 2rem;

        .content {
            width: 40%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: flex-end;
        }
    }

    .footer {
        margin-top: 4rem;

        .btn {
            width: 10%;
            margin: auto;
            margin-right: 0;
        }
    }

    .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 3rem;

        svg {
            font-size: 1.6rem;
            font-weight: bold;
            transition: .5s;
            cursor: pointer;

            &:hover {
                color: var(--red)
            }
        }
    }

    .btn-add {
        background: var(--blue);
        padding: 1rem;
        border: 1px solid #636363;
        border-radius: .2rem;
        height: 66%;
        width: 12%;
        transition: .7s;
        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;

        svg {
            color: #FFF;
            font-size: .9rem;
        }

        &:hover {
            background: var(--blue_active);
        }
    }

    .btn-trash {
        background: var(--red);
        padding: 1rem;
        border: 1px solid #636363;
        border-radius: .2rem;
        height: 66%;
        width: 12%;
        transition: .7s;
        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;

        svg {
            color: #FFF;
            font-size: .9rem;
        }

        &:hover {
            background: var(--red_active);
        }
    }

    .input-content {
        width: 85%;
    }

    .items-adds {
        width: 40%;
    }
    .item {
        margin-top: .9rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    @media (max-width: 500px) { 
        margin-top: 1.5rem;
        padding: 1.9rem 1.25rem;

        .row {
            .content {
                width: 100%;
                margin: 1rem 0;
            }
        }

        .input-content {
            width: 100%;
        }

        .btn-add { 
            width: 100%;
            height: 35%;
        }

        .items-adds {
            width: 100%;

            .item {
                margin-top: .5rem;
                flex-wrap: wrap;
            }

            .btn-trash { 
                width: 100%;
            }
        }

        .footer .btn {
            width: 100%;
        }
    }
`;