import { Schema, Model, Document, model } from "mongoose";
interface FaqItem extends Document {
    question: string;
    answer: string;
}
interface Category extends Document {
    title: string;
}

interface BannerImage extends Document {
    public_id: string;
    url: string;
}

interface Layout extends Document {
    type: string;
    faq?: FaqItem[];
    category?: Category[];
    banner: {
        image: BannerImage;
        title: string;
        subTitle: string;

    }
}

const faqSchema: Schema<FaqItem> = new Schema({
    question: {
        type: String,

    },
    answer: {
        type: String,

    }
});

const categorySchema: Schema<Category> = new Schema({
    title: {
        type: String,

    }
});


const bannerImageSchema: Schema<BannerImage> = new Schema({
    public_id: {
        type: String,

    },
    url: {
        type: String,

    }
});

const layoutSchema: Schema<Layout> = new Schema({
    type: {
        type: String,

    },
    faq: [faqSchema],
    category: [categorySchema],
    banner: {
        image: bannerImageSchema,
        title: {
            type: String,

        },
        subTitle: {
            type: String,

        }
    }
}, { timestamps: true });

const LayoutModel =model<Layout>('layout', layoutSchema);
export default LayoutModel