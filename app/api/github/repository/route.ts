import axios from "axios";
import { NextResponse } from "next/server";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  updated_at: string;
  languages_url: string;
  html_url: string;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const CACHE_DURATION = 3600; // 1 hour

export async function GET(req: Request) {
  try {
    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { message: "GitHub token not configured" },
        { status: 500 },
      );
    }

    const response = await axios.get<Repository[]>(
      "https://api.github.com/user/repos?affiliation=owner,collaborator&sort=pushed&direction=desc&visibility=public",
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    if (response.status !== 200) {
      console.error("GitHub API error:", response.data);
      return NextResponse.json(
        { message: "Failed to fetch from GitHub" },
        { status: response.status },
      );
    }

    const data = response.data;

    const repoList = await Promise.allSettled(
      data.map(async (repo: Repository) => {
        try {
          const langResponse = await axios.get<Record<string, number>>(
            repo.languages_url,
            {
              headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
              },
            },
          );

          const langData = langResponse.data || {};

          return {
            id: repo.id,
            name: repo.name,
            description: repo.description || "No description provided.",
            lastUpdate: new Date(repo.updated_at).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Asia/Bangkok",
            }),
            language: Object.keys(langData),
            link: repo.html_url,
          };
        } catch (error) {
          console.error(`Failed to fetch languages for ${repo.name}:`, error);
          return {
            id: repo.id,
            name: repo.name,
            description: repo.description || "No description provided.",
            lastUpdate: new Date(repo.updated_at).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Asia/Bangkok",
            }),
            language: [],
            link: repo.html_url,
          };
        }
      }),
    );

    const successfulRepos = repoList
      .filter((result) => result.status === "fulfilled")
      .map((result) => (result as PromiseFulfilledResult<any>).value);

    return NextResponse.json(
      { data: successfulRepos, status: 200 },
      {
        headers: {
          "Cache-Control": `public, max-age=${CACHE_DURATION}, s-maxage=${CACHE_DURATION}`,
          "CDN-Cache-Control": `max-age=${CACHE_DURATION}`,
        },
      },
    );
  } catch (err: unknown) {
    let message = "Something went wrong";
    if (err instanceof Error) {
      message = err.message;
    }
    console.error(message);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
