import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const response = await axios.get(
      `https://api.github.com/user/repos?affiliation=owner,collaborator&sort=pushed&direction=desc&visibility=public`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      },
    );
    const data = response.data;
    const totalLang: Record<string, number> = {};
    let totalByte = 0;

    const repoList = await Promise.all(
      data.map(async (repo: any) => {
        const langResponse = await axios.get(repo.languages_url, {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
        });

        const langData = langResponse.data as Record<string, number>;

        if (langData) {
          for (const [key, value] of Object.entries(langData)) {
            totalLang[key] = (totalLang[key] || 0) + (value as number);
            totalByte += value as number;
          }
        }

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
          language: Object.keys(langData || {}),
          link: repo.html_url,
        };
      }),
    );

    if (response.status !== 200) {
      console.error("GitHub API error:", data);
      return NextResponse.json(
        { message: data.message || "Failed to fetch from GitHub" },
        { status: response.status },
      );
    }

    return NextResponse.json({ data: repoList, status: 200 });
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
