import TwitterInputCard from "@/src/components/TwitterInputCard";
import Layout from "../components/Layout/Layout";
import { FeedCard } from "../components/FeedCard";
import { useState } from "react";

export default function Home() {
  return (
    <Layout>
      <TwitterInputCard  />
      <FeedCard />
    </Layout>
  );
}
