import { describe, it, expect, afterAll, beforeAll } from "vitest";
import dbConnect from "../../lib/db/mongoose";
import mongoose from "mongoose";
import Project from "../../lib/models/Project";
import Category from "../../lib/models/Category";

afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
});

describe("Dashboard form project CRUD", () => {
    let category: { _id: mongoose.Types.ObjectId } | null = null;
    let projectId: mongoose.Types.ObjectId | null = null;

    beforeAll(async () => {
        await dbConnect();
        category = await Category.create({ name: "Test Category", slug: "test-category" });
    });

    describe("Create", () => {
        it("creates a new project", async () => {
            const newProject = await Project.create({
                type: "Personal",
                title: "Test Project",
                category: category!._id,
                year: 2026,
                videoLink: "https://youtu.be/test",
                description: "A test project",
                media: [],
                credits: [],
                visibility: "draft",
            });

            expect(newProject).toBeTruthy();
            expect(newProject.title).toBe("Test Project");
                projectId = newProject._id;
        });
    });

    describe("Read", () => {
        it("fetches the created project", async () => {
            const fetched = await Project.findById(projectId).lean();
            expect(fetched).toBeTruthy();
            expect(String(fetched!.category)).toBe(String(category!._id));
        });
    });

    describe("Update", () => {
        it("updates project fields", async () => {
            const updated = await Project.findByIdAndUpdate(
                projectId,
                { title: "Updated Test Project", visibility: "published" },
                { new: true }
            ).lean();

            expect(updated).toBeTruthy();
            expect(updated!.title).toBe("Updated Test Project");
            expect(updated!.visibility).toBe("published");
        });
    });

    describe("Delete", () => {
        it("deletes the project and cleans up category", async () => {
            await Project.findByIdAndDelete(projectId);
            const afterDelete = await Project.findById(projectId).lean();
            expect(afterDelete).toBeNull();

            // Cleanup category
            await Category.findByIdAndDelete(category!._id);
        });
    });
});