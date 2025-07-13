import { MainLayout } from "@/components/layouts";

export default function LibrarianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout user={{ name: "Israel Alfaro", role: "librarian" }}>
      {children}
    </MainLayout>
  );
}
