// server.js
import express from 'express';
const { ApolloServer, gql } = require('apollo-server-express');
const { createClient } = require('@supabase/supabase-js');
const schedule = require('node-schedule');

const supabase = createClient('https://vanpjobbtvaczauvarai.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhbnBqb2JidHZhY3phdXZhcmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2MTUwODQsImV4cCI6MjAzNjE5MTA4NH0.EFi9HYThWoyJacbtupWUJB7MugccBXsKu9Ni9Qcac8k');

const typeDefs = gql`
  type Budget {
    id: ID!
    user_id: ID!
    start_date: String!
    end_date: String!
    total_budget: Float!
    savings_per_day: [JSON]
    expenses_per_day: [JSON]
    purse: Float!
  }

  type Query {
    budgets: [Budget]
  }

  type Mutation {
    updateBudget(budgetId: String!, savings: JSON, expenses: JSON): Budget
  }
`;

const resolvers = {
  Query: {
    budgets: async () => {
      const { data, error } = await supabase.from('budget').select('*');
      if (error) throw new Error(error.message);
      return data;
    }
  },
  Mutation: {
    updateBudget: async (_, { budgetId, savings, expenses }) => {
      const { data, error } = await supabase.from('budget')
        .update({ savings_per_day: savings, expenses_per_day: expenses })
        .eq('id', budgetId);

      if (error) throw new Error(error.message);
      return data[0];
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 5000 }, () =>
  console.log(`Server ready at http://localhost:5000${server.graphqlPath}`)
);

const sendEmailNotification = (email, savings) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'YOUR_EMAIL@gmail.com',
      pass: 'YOUR_EMAIL_PASSWORD'
    }
  });

  const mailOptions = {
    from: 'YOUR_EMAIL@gmail.com',
    to: email,
    subject: 'Daily Savings Notification',
    text: `Your savings for today: ${JSON.stringify(savings)}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

// Schedule the function to run every day at 11:59 PM
schedule.scheduleJob('59 23 * * *', updateDailyBudgets);
