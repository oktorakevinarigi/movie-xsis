import { Header, Footer, SimpleBlock } from "@/components/layouts";
import { BannerDetail, Review, Recommendation } from "../feature";

type DetailPageProps = {
  id: string;
};

export function DetailPage(props: DetailPageProps) {
  const { id } = props;
  return (
    <>
      <Header />
      <div className="bg-white">
        <BannerDetail />
        <SimpleBlock className="py-11">
          <Review />
        </SimpleBlock>
      </div>
      <SimpleBlock className="my-[50px]">
        <Recommendation id={id} />
      </SimpleBlock>
      <Footer />
    </>
  );
}
