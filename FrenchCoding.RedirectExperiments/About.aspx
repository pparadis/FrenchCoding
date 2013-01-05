<%@ Page Title="About" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="About.aspx.cs" Inherits="FrenchCoding.RedirectExperiments.About" %>

<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <hgroup class="title">
        <h1><%: Page.Title %>.</h1>
        <h2>Your quintessential app description page.</h2>
    </hgroup>

    <article>
        <p>        
            Use this area to provide additional information.
        </p>

        <p>        
            Use this area to provide additional information.
        </p>

        <p>        
            Use this area to provide additional information.
        </p>
    </article>















    <asp:Repeater ID="TypingTest" runat="server" ItemType="FrenchCoding.RedirectExperiments.User">
        <ItemTemplate>
             <%# Item.Name %>
        </ItemTemplate>
    </asp:Repeater>




    <asp:Button OnClick="btds_Click" runat="server" ID="btds" />





    <video controls="controls">
        <source src="bob.mp4" type="video/mp4" />
        <source src="bob.webm" type="video/webm" />
        <source src="bob.ogv" type="video/ogg" />
    </video>















    <aside>
        <h3>Aside Title</h3>
        <p>        
            Use this area to provide additional information.
        </p>
        <ul>
            <li><a runat="server" href="~/">Home</a></li>
            <li><a runat="server" href="~/About.aspx">About</a></li>
            <li><a runat="server" href="~/Contact.aspx">Contact</a></li>
        </ul>
    </aside>
</asp:Content>